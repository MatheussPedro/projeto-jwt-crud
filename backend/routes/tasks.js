const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Task = require('../models/task');

router.use(verifyToken);

router.get('/', async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.userId } });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ title, userId: req.userId });
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findOne({ where: { id: req.params.id, userId: req.userId } });
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  task.title = req.body.title;
  await task.save();
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const count = await Task.destroy({ where: { id: req.params.id, userId: req.userId } });
  if (count === 0) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.status(204).send();
});

module.exports = router;