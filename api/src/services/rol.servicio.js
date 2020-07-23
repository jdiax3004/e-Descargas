const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')
const consecutivo = require('./consecutivo.servicio')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerRol")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerRol", { Id: codigo })
}

servicio.insertar = async (objeto, usuario) => {
  const data = await storeProcedure("InsertarRol", objeto)
  bitacora.log(bitacora.INSERTAR, data, usuario)
  return data
}

module.exports = servicio