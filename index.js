const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./sqlite');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CRUD de facturas
app.get('/api/facturas', (req, res) => {
  db.all('SELECT * FROM facturas', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/facturas', (req, res) => {
  const { cliente, monto } = req.body;
  db.run('INSERT INTO facturas (cliente, monto) VALUES (?, ?)', [cliente, monto], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

app.put('/api/facturas/:id', (req, res) => {
  const { cliente, monto } = req.body;
  db.run('UPDATE facturas SET cliente = ?, monto = ? WHERE id = ?', [cliente, monto, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Factura actualizada' });
  });
});

app.delete('/api/facturas/:id', (req, res) => {
  db.run('DELETE FROM facturas WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Factura eliminada' });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
