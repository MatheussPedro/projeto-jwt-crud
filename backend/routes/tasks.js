
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

let tasks = [];

router.use(verifyToken);

router.get('/', (req, res) => {
  res.json(tasks.filter(task => task.userId === req.userId));
});

router.post('/', (req, res) => {
  const { title } = req.body;
  const task = { id: Date.now(), title, userId: req.userId };
  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id && t.userId === req.userId);
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  task.title = req.body.title;
  res.json(task);
});

router.delete('/:id', (req, res) => {
  tasks = tasks.filter(t => !(t.id == req.params.id && t.userId === req.userId));
  res.status(204).send();
});

module.exports = router;
