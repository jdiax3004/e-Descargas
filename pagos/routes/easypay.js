var express = require('express');
const db = require('../db');
var app = express();

app.post('/', (req, res) => {
  var numeroCuenta = req.body.cuenta;
  var contrasena = req.body.contrasena;
  var codigo = req.body.codigo;
  var monto = req.body.monto;

  if (!numeroCuenta) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No se especifico el número de cuenta',
    });
  }

  if (!monto) {
    return res.status(400).json({
      ok: false,
      mensaje: 'No se especifico el monto',
    });
  }

  db.sequelize
    .query('dbo.ObtenerCuentaEasyPay @Numero = :numero', {
      replacements: { numero: numeroCuenta },
    })
    .then((data) => {
      // console.log(data[0]); -> BUG
      if (
        contrasena !== data[0][0].Contrasenna ||
        codigo !== data[0][0].Codigo_Seguridad
      ) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Credenciales inválidas',
        });
      }

      if (monto > data[0][0].Fondos) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Sin suficientes fondos',
        });
      }

      if (isNaN(monto)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El monto ingresado no es correcto',
        });
      }

      db.sequelize
        .query(
          'dbo.DescontarSaldoCuentaEasyPay @Numero = :numero, @Monto = :monto',
          {
            replacements: { numero: numeroCuenta, monto: monto },
          }
        )
        .then((data) => {
          res.status(200).json({
            ok: true,
            mensaje: 'Transferencia realizada con éxito',
          });
        });
    });
});

module.exports = app;
