const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const sequelize = require('./db');
const Task = require('./models/task');

const app = express();
app.use(cors());
app.use(express.json());

app.use(rateLimit({ windowMs: 60_000, max: 100 }));

app.use('/login', authRoutes);
app.use('/tasks', tasksRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
});