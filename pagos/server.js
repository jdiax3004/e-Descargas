const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// Importar Rutas
const tarjetasRoutes = require('./routes/tarjetas');
const easypayRoutes = require('./routes/easypay');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.use('/tarjetas', tarjetasRoutes);
app.use('/easypay', easypayRoutes);

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
