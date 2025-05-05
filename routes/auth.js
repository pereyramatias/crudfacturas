const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../sqlite');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto123';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM usuarios WHERE username = ?', [username], async (err, row) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    if (row) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) return res.status(500).json({ message: 'Error al registrar usuario' });
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM usuarios WHERE username = ?', [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Login fallido: usuario no encontrado' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Login fallido: contraseña incorrecta' });

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
