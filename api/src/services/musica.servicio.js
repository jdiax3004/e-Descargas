const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')
const consecutivo = require('./consecutivo.servicio')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerMusica")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerMusica", { Codigo: codigo })
}

servicio.insertar = async (objeto) => {
  objeto.Codigo = await consecutivo.generar(consecutivo.MUSICA)
  const data = await storeProcedure("InsertarMusica", objeto)
  bitacora.log(bitacora.INSERTAR, data)
  return data
}

servicio.modificar = async (objeto) => {
  const data = await storeProcedure("ModificarMusica", objeto)
  bitacora.log(bitacora.MODIFICAR, data)

  return data
}

servicio.eliminar = async (codigo) => {
  const data = await storeProcedure("EliminarMusica", { Codigo: codigo })
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo })

  return true
}

module.exports = servicio
