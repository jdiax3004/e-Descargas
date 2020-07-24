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

servicio.insertar = async (objeto, usuario) => {
  objeto.Codigo = await consecutivo.generar(consecutivo.MUSICA)
  const data = await storeProcedure("InsertarMusica", objeto)
  bitacora.log(bitacora.INSERTAR, data, usuario)
  return data
}

servicio.modificar = async (objeto, usuario) => {
  delete objeto.Idioma
  delete objeto.Genero
  const data = await storeProcedure("ModificarMusica", objeto)
  bitacora.log(bitacora.MODIFICAR, usuario)

  return data
}

servicio.eliminar = async (codigo, usuario) => {
  const data = await storeProcedure("EliminarMusica", { Codigo: codigo })
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo }, usuario)

  return true
}

module.exports = servicio
