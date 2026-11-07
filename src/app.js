const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json()); // permite leer el body en formato JSON
app.use(routes);
app.use(errorHandler);

module.exports = app;