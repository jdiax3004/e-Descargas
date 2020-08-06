const axios = require('axios')
const bitacora = require('../log/bitacora.log')

const api_url = process.env.PAGOS_API_URL.toString()

let servicio = {}

servicio.procesarTarjeta = async (tarjeta, monto) => {
  const data = await axios.post(`${api_url}/tarjetas`, {
    numeroCuenta: tarjeta.Numero,
    cvv: tarjeta.CVV,
    mes: tarjeta.Mes_Expiracion,
    anno: tarjeta.Anno_Expiracion,
    monto
  }).catch(err => {
    throw new Error(err.response.data.errors)
  })

  if(!data.data.ok) {
    throw new Error(data.data.errors)
  } 

  return true
} 

servicio.procesarEasyPay = async (easypay, monto) => {
  const data = await axios.post(`${api_url}/easypay`, {
    numeroCuenta: easypay.Numero_Cuenta,
    contrasena: easypay.Contrasenna,
    codigo: easypay.Codigo_Seguridad,
    monto
  }).catch(err => {
    throw new Error(err.response.data.errors)
  })

  if(!data.data.ok) {
    throw new Error(data.data.errors)
  } 

  return true
} 

module.exports = servicio