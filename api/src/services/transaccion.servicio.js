const { storeProcedure } = require("utils/db.utils")({ db: require('../db') })
const { filtrar } = require("utils/array.utils")
const bitacora = require('../log/bitacora.log')
const consecutivo = require('./consecutivo.servicio')
const pagos = require('./pagos-api.servicio')
const descargas = require('./decargas.servicio')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerTransaccion")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerTransaccion", { Codigo: codigo })
}

servicio.insertar = async (objeto, usuario) => {
  if(!objeto.Metodo_Pago) throw new Error("No se especificó el método de pago.");

  if(objeto.Tipo_Pago == 'tarjeta') {
    await pagos.procesarTarjeta(objeto.Metodo_Pago, objeto.Monto)
      .catch(err => { throw err })
  }

  if(objeto.Tipo_Pago == 'easy_pay') {
    await pagos.procesarEasyPay(objeto.Metodo_Pago, objeto.Monto)
      .catch(err => { throw err })
  }

  delete objeto.Metodo_Pago
  objeto.Codigo = await consecutivo.generar(consecutivo.TRANSACCION)
  objeto.Fecha = new Date()
  const data = await storeProcedure("InsertarTransaccion", objeto)
  bitacora.log(bitacora.INSERTAR, data, usuario)
  return data
}

servicio.modificar = async (objeto, usuario) => {
  const data = await storeProcedure("ModificarTransaccion", objeto)
  bitacora.log(bitacora.MODIFICAR, data, usuario)

  return data
}

servicio.eliminar = async (codigo, usuario) => {
  const data = await storeProcedure("EliminarTransaccion", { Codigo: codigo })
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo }, usuario)

  return true
}

module.exports = servicio
