const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerParametros")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerParametros", { Id: id })
}

servicio.insertar = async (objeto) => {
  const data = await storeProcedure("InsertarParametros", objeto)
  bitacora.log(bitacora.INSERTAR, data)
  return data
}

servicio.modificar = async (objeto) => {
  const data = await storeProcedure("ModificarParametros", objeto)
  bitacora.log(bitacora.MODIFICAR, data)

  return data
}

servicio.eliminar = async (codigo) => {
  const data = await storeProcedure("EliminarParametros", { Id: id })
  bitacora.log(bitacora.ELIMINAR, { Id: id })

  return true
}

module.exports = servicio
