// Entry point
const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// Rutas
app.use('/tarjetas', require('./routes/tarjetas.ruta'));
app.use('/easypay', require('./routes/easypay.ruta'));

// Escuchar peticiones
app.listen(3001, () =>
  console.log(
    'Express server corriendo en el puerto 3001: \x1b[32m%s\x1b[0m',
    'Online!'
  )
);

// Conexcion BD
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Se ha conectado correctamente a la Base de Datos: Pagos.');
  })
  .catch((err) => {
    console.error('Hubo un error al conectar a la Base de Datos:', err);
  });

module.exports = app;
