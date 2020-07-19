const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')
const consecutivo = require('./consecutivo.servicio')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerUsuario")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerUsuario", { Codigo: codigo })
}

servicio.insertar = async (objeto) => {
  objeto.Codigo = await consecutivo.generar(consecutivo.USUARIO)
  const data = await storeProcedure("InsertarUsuario", objeto)
  bitacora.log(bitacora.INSERTAR, data)
  return data
}

servicio.modificar = async (objeto) => {
  const data = await storeProcedure("ModificarUsuario", objeto)
  bitacora.log(bitacora.MODIFICAR, data)

  return data
}

servicio.eliminar = async (codigo) => {
  const data = await storeProcedure("EliminarUsuario", { Codigo: codigo })
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo })

  return true
}

module.exports = servicio
