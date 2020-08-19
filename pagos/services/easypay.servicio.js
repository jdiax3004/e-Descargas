const db = require('../db')

const descontarSaldoCuenta = async (objeto) => {

    const {contrasena,monto,numeroCuenta,codigo} = objeto;

    let data = await db.sequelize
    .query('dbo.ObtenerCuentaEasyPay @Numero = :numero', {
      replacements: { numero: numeroCuenta },
    })

      if (!data[0][0]) {
        return {
          ok: false,
          mensaje: 'No fue posible realizar la transacción',
          errors: 'No existe una cuenta con el número ' + numeroCuenta,
        };
      }
      console.log(typeof(data[0][0].Codigo_Seguridad), typeof(codigo))
      if (
        contrasena != data[0][0].Contrasenna ||
        codigo != data[0][0].Codigo_Seguridad
      ) {
        return {
          ok: false,
          mensaje: 'Error de autenticación',
          errors: 'Credenciales inválidas',
        };
      }

      if (monto > data[0][0].Fondos) {
        return {
          ok: false,
          mensaje: 'No fue posible realizar la transacción',
          errors: 'Sin suficientes fondos',
        };
      }

      if (isNaN(monto) || Math.sign(monto) === -1) {
        return {
          ok: false,
          mensaje: 'No fue posible realizar la transacción',
          errors: 'El valor ' + monto + ' no es un monto válido',
        };
      }

      let transaccion = await db.sequelize
        .query(
          'dbo.DescontarSaldoCuentaEasyPay @Numero = :numero, @Monto = :monto',
          {
            replacements: { numero: numeroCuenta, monto: monto },
          }
        )

          return {
            ok: true,
            mensaje: 'Transferencia realizada con éxito',
          };
}

module.exports = {
    descontarSaldoCuenta
}