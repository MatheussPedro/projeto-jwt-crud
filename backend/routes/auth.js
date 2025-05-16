
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../users.json');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id }, 'secreto123', { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
