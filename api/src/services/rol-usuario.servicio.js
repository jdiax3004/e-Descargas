const { storeProcedure } = require("utils/db.utils")({ db: require('../db') })
const { filtrar } = require("utils/array.utils")
const bitacora = require('../log/bitacora.log')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerRolUsuario")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerUno = async (Codigo_Usuario) => {
  return await storeProcedure("ObtenerRolUsuario", { Codigo_Usuario: Codigo_Usuario })
}

servicio.insertar = async (objeto, usuario) => {
  const data = await storeProcedure("InsertarRolUsuario", objeto)
  return data
}

servicio.eliminar = async (Codigo_Usuario, usuario) => {
  const data = await storeProcedure("EliminarRolUsuario", { Codigo_Usuario })

  return true
}

module.exports = servicio
