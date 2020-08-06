const db = require('../db')

const descontarSaldoTarjeta = async (objeto) => {

    const { cvv, numeroCuenta, monto } = objeto;
    var fecha = new Date();
    var esDebito;
    
    let tarjeta = await db.sequelize.query('EXEC dbo.ObtenerTarjeta @Numero = :numero', {
      replacements: { numero: numeroCuenta },
    }).catch(err => { throw err })

    if (!tarjeta[0][0]) {
        return {
          ok: false,
          mensaje: 'Error al momento de realizar la transacción',
          errors:
            'El número de cuenta ' +
            numeroCuenta +
            ' no pertenece a ninguna tarjeta registrada',
        };
    }

    if (tarjeta[0][0].CVV !== cvv) {
        return {
          ok: false,
          mensaje: 'Error al momento de realizar la transación',
          errors: 'Credenciales inválidas',
        };
    }

    if (tarjeta[0][0].Anno_Expiracion <= fecha.getFullYear()) {
        if (tarjeta[0][0].Mes_Expiracion < fecha.getMonth() + 1) {
          return {
            ok: false,
            mensaje: 'Error al momento de realizar la transación',
            errors: 'La tarjeta está expirada',
          };
        }
    }

      if (isNaN(monto) || Math.sign(monto) === -1) {
        return {
          ok: false,
          mensaje: 'Error al momento de realizar la transación',
          errors: 'El valor ' + monto + ' no es un monto válido',
        };
      }

      if (!tarjeta[0][0].Fondos) {
        esDebito = 2;
        if (tarjeta[0][0].Limite < monto) {
          return {
            ok: false,
            mensaje: 'Error al momento de realizar la transación',
            errors: 'Está sobrepasando el límite de su tarjeta de crédito',
          };
        }
      } else {
        esDebito = 1;
        if (tarjeta[0][0].Fondos < monto) {
          return {
            ok: false,
            mensaje: 'Error al momento de realizar la transación',
            errors: 'Sin fondos suficientes',
          };
        }
      }

    let transaccion = await db.sequelize.query('dbo.DescontarSaldoTarjeta @Numero = :numero, @Monto = :monto, @EsDebito = :debito',
        {
          replacements: {
            numero: numeroCuenta,
            monto: monto,
            debito: esDebito,
          },
        }
    ).catch(err => { throw err });

    return {
        ok: true,
        mensaje: 'El pago se ha realizado con éxito',
    };
}

module.exports = {
    descontarSaldoTarjeta
}