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
      mensaje: 'Error al momento de realizar la transacción',
      errors: 'No se especifico el número de cuenta',
    });
  }

  if (!monto) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Error al momento de realizar la transacción',
      errors: 'No se especifico el monto',
    });
  }

  db.sequelize
    .query('dbo.ObtenerCuentaEasyPay @Numero = :numero', {
      replacements: { numero: numeroCuenta },
    })
    .then((data) => {
      // console.log(data[0]); -> BUG

      if (!data[0][0]) {
        return res.status(401).json({
          ok: false,
          mensaje: 'No fue posible realizar la transacción',
          errors: 'No existe una cuenta con el número ' + numeroCuenta,
        });
      }

      if (
        contrasena !== data[0][0].Contrasenna ||
        codigo !== data[0][0].Codigo_Seguridad
      ) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Error de autenticación',
          errors: 'Credenciales inválidas',
        });
      }

      if (monto > data[0][0].Fondos) {
        return res.status(400).json({
          ok: false,
          mensaje: 'No fue posible realizar la transacción',
          errors: 'Sin suficientes fondos',
        });
      }

      if (isNaN(monto) || Math.sign(monto) === -1) {
        return res.status(400).json({
          ok: false,
          mensaje: 'No fue posible realizar la transacción',
          errors: 'El valor ' + monto + ' no es un monto válido',
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
          return res.status(200).json({
            ok: true,
            mensaje: 'Transferencia realizada con éxito',
          });
        });
    });
});

module.exports = app;
