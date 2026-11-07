const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json()); // permite leer el body en formato JSON
app.use(routes);

module.exports = app;