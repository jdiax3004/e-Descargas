const axios = require('axios')
const bitacora = require('../log/bitacora.log')

const api_url = process.env.PAGOS_API_URL.toString()

let servicio = {}

servicio.procesarTarjeta = async (tarjeta, monto) => {
  const data = await axios.post(`${api_url}/tarjetas`, {
    numeroCuenta: tarjeta.Numero_Tarjeta,
    cvv: tarjeta.CVV,
    monto
  }).catch(err => {
    throw new Error(err.response.data.errors)
  })

  if(!data.response.ok) {
    throw new Error(data.response.errors)
  } 

  return true
} 

servicio.procesarEasyPay = async (easypay, monto) => {
  
} 

module.exports = servicio