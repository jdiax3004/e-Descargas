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
  return await storeProcedure("ObtenerParametros", { Id: codigo })
}

servicio.insertar = async (objeto, usuario) => {
  const data = await storeProcedure("InsertarParametros", objeto)
  bitacora.log(bitacora.INSERTAR, data, usuario)
  return data
}

servicio.modificar = async (objeto, usuario) => {
  const data = await storeProcedure("ModificarParametros", objeto)
  bitacora.log(bitacora.MODIFICAR, data, usuario)

  return data
}

servicio.eliminar = async (codigo, usuario) => {
  const data = await storeProcedure("EliminarParametros", { Id: codigo })
  bitacora.log(bitacora.ELIMINAR, { Id: codigo }, usuario)

  return true
}

module.exports = servicio
