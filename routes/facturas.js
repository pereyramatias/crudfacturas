
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('./database.db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM facturas WHERE usuario_id = ?', [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener facturas' });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { descripcion, monto } = req.body;
  db.run('INSERT INTO facturas (descripcion, monto, usuario_id) VALUES (?, ?, ?)', 
    [descripcion, monto, req.user.id], 
    function (err) {
      if (err) return res.status(500).json({ error: 'Error al crear factura' });
      res.json({ id: this.lastID, descripcion, monto });
    }
  );
});

module.exports = router;
