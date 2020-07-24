var express = require('express');
const { descontarSaldoCuenta } = require('../services/easypay.servicio')
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

  try{
    let data = await descontarSaldoCuenta(req.body);

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
