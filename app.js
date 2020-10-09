const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const config = require('./src/config');

const app = express();
app.use(morgan('dev'));

app.use(express.json({ type: '*/*' }));
app.use(routes);

app.use((err, req, res) => {
  return res.json({ error: err.message });
});

mongoose.connect(
  `mongodb+srv://${config.dbUser}:${config.dbPassword}@cluster0-sirbp.mongodb.net/${config.dbName}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = app;
