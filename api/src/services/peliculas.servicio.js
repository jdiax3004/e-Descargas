const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')
const consecutivo = require('./consecutivo.servicio')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerPeliculas")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerPeliculas", { Codigo: codigo })
}

servicio.insertar = async (objeto, usuario) => {
  objeto.Codigo = await consecutivo.generar(consecutivo.PELICULA)
  const data = await storeProcedure("InsertarPeliculas", objeto)
  bitacora.log(bitacora.INSERTAR, data, usuario)
  return data
}

servicio.modificar = async (objeto, usuario) => {
  delete objeto.Idioma
  delete objeto.Genero
  const data = await storeProcedure("ModificarPeliculas", objeto)
  bitacora.log(bitacora.MODIFICAR, data, usuario)

  return data
}

servicio.eliminar = async (codigo, usuario) => {
  const data = await storeProcedure("EliminarPeliculas", { Codigo: codigo })
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo }, usuario)

  return true
}

module.exports = servicio
