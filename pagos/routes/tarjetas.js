var express = require('express');
const db = require('../db');
var app = express();

app.post('/', (req, res) => {
  var numeroCuenta = req.body.numero;
  var cvv = req.body.cvv;
  var monto = req.body.monto;
  var fecha = new Date();
  var esDebito;

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

  if (!cvv) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Error al momento de realizar la transacción',
      errors: 'No se especifico el codigo de seguridad',
    });
  }

  db.sequelize
    .query('EXEC dbo.ObtenerTarjeta @Numero = :numero', {
      replacements: { numero: numeroCuenta },
    })
    .then((tarjeta) => {
      if (!tarjeta[0][0]) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al momento de realizar la transacción',
          errors:
            'El número de cuenta ' +
            numeroCuenta +
            ' no pertenece a ninguna tarjeta registrada',
        });
      }

      if (tarjeta[0][0].CVV !== cvv) {
        return res.status(401).json({
          ok: false,
          mensaje: 'Error al momento de realizar la transación',
          errors: 'Credenciales inválidas',
        });
      }

      if (tarjeta[0][0].Anno_Expiracion <= fecha.getFullYear()) {
        if (tarjeta[0][0].Mes_Expiracion < fecha.getMonth() + 1) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al momento de realizar la transación',
            errors: 'La tarjeta está expirada',
          });
        }
      }

      if (isNaN(monto) || Math.sign(monto) === -1) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al momento de realizar la transación',
          errors: 'El valor ' + monto + ' no es un monto válido',
        });
      }

      if (!tarjeta[0][0].Fondos) {
        esDebito = 2;
        if (tarjeta[0][0].Limite < monto) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al momento de realizar la transación',
            errors: 'Está sobrepasando el límite de su tarjeta de crédito',
          });
        }
      } else {
        esDebito = 1;
        if (tarjeta[0][0].Fondos < monto) {
          return res.status(400).json({
            ok: false,
            mensaje: 'Error al momento de realizar la transación',
            errors: 'Sin fondos suficientes',
          });
        }
      }

      db.sequelize.query(
        'dbo.DescontarSaldoTarjeta @Numero = :numero, @Monto = :monto, @EsDebito = :debito',
        {
          replacements: {
            numero: numeroCuenta,
            monto: monto,
            debito: esDebito,
          },
        }
      );

      return res.status(200).json({
        ok: false,
        mensaje: 'El pago se ha realizado con éxito',
      });
    });
});

module.exports = app;
