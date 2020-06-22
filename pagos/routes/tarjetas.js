var express = require('express');
var app = express();

app.post('/', (req, res) => {
  res.status(200).json({
    mensaje: 'funcionando',
  });
});

module.exports = app;
