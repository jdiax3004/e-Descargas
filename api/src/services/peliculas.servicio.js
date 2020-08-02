const { storeProcedure } = require("utils/db.utils")({ db: require('../db') })
const { filtrar } = require("utils/array.utils")
const archivos = require('./archivos.servicio')
const bitacora = require('../log/bitacora.log')
const errorLoguer = require('../log/error.log')
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
  const item = await servicio.obtenerUno(objeto.Codigo)
  if(objeto.Archivo_Descarga && item.Archivo_Descarga && objeto.Archivo_Descarga != item.Archivo_Descarga) {
    await archivos.eliminar(item.Archivo_Descarga)
  }
  if(objeto.Archivo_Previsualizacion && item.Archivo_Previsualizacion && objeto.Archivo_Previsualizacion != item.Archivo_Previsualizacion ) {
    await archivos.eliminar(item.Archivo_Previsualizacion)
  }
  const data = await storeProcedure("ModificarPeliculas", objeto)
  bitacora.log(bitacora.MODIFICAR, data, usuario)

  return data
}

servicio.eliminar = async (codigo, usuario) => {
  const item = await servicio.obtenerUno(codigo)
  try {
    await archivos.eliminar(item.Archivo_Descarga)
    await archivos.eliminar(item.Archivo_Previsualizacion)
  } catch(err) {
    errorLoguer.log(err)
  }
  const data = await storeProcedure("EliminarPeliculas", { Codigo: codigo })
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo }, usuario)

  return true
}

module.exports = servicio
