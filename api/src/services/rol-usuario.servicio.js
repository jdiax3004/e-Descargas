const { storeProcedure } = require("utils/db.utils")({ db: require('../db') })
const { filtrar } = require("utils/array.utils")
const bitacora = require('../log/bitacora.log')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerRolUsuario")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerRoles = async (Codigo_Usuario) => {
  let data = (await storeProcedure("ObtenerRolUsuarioArray", { Codigo_Usuario: Codigo_Usuario }))[0].Id_Roles
  try {
    return data ? JSON.parse(data) : []
  } catch(err) {
    return []
  }
  
}

servicio.insertar = async (objeto) => {
  const data = await storeProcedure("InsertarRolUsuario", objeto)
  return data
}

servicio.eliminar = async (Codigo_Usuario) => {
  const data = await storeProcedure("EliminarRolUsuario", { Codigo_Usuario })

  return true
}

module.exports = servicio
