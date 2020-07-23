// Tarjetas Route
const express = require('express');
const { descontarSaldoTarjeta } = require('../services/tarjetas.servicio')

const app = express();


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

  try{
    let data = await descontarSaldoTarjeta(req.body);

    if(data.ok){
      return res.status(200).json(data);
    }else{
      return res.status(400).json(data);
    }
  }catch(error){
    return res.status(500).json({
      ok:false,
      mensaje: 'Hubo un error al momento de realizar la transacción',
      errors: error
    })
  }
});

module.exports = app;
