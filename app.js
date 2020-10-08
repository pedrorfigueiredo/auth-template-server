const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
app.use(morgan('dev'));
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

app.use(express.json({ type: '*/*' }));
app.use(routes);

app.use((err, req, res) => {
  return res.json({ error: err.message });
});

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-sirbp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = app;
