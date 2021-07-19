require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const authRouter = require('./auth/routes');
const taskRouter = require('./todo/routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client', 'build')));

app.use('api/tasks', taskRouter);
app.use('api/auth', authRouter);
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

app.use(errorHandler);

app.listen(process.env.PORT || 3006, () => {
  console.log('server');
});
