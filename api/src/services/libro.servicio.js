const { storeProcedure } = require("utils/db.utils")({ db: require('../db') })
const { filtrar } = require("utils/array.utils")
const archivos = require('./archivos.servicio')
const bitacora = require('../log/bitacora.log')
const errorLoguer = require('../log/error.log')
const consecutivo = require('./consecutivo.servicio')

let servicio = {};

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerLibro")
  if(filtros) result = filtrar(result, filtros)
  return await storeProcedure("ObtenerLibro");
};

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerLibro", { Codigo: codigo });
};

servicio.insertar = async (objeto, usuario) => {
  objeto.Codigo = await consecutivo.generar(consecutivo.LIBRO)
  const data = await storeProcedure("InsertarLibro", objeto);
  bitacora.log(bitacora.INSERTAR, data, usuario);
  return data;
};

servicio.modificar = async (objeto, usuario) => {
  delete objeto.Idioma
  delete objeto.Genero
  const data = await storeProcedure("ModificarLibro", objeto);
  bitacora.log(bitacora.MODIFICAR, data, usuario);

  return data;
};

servicio.eliminar = async (codigo, usuario) => {
  const item = await servicio.obtenerUno(codigo)
  try {
    await archivos.eliminar(item.Archivo_Descarga)
    await archivos.eliminar(item.Archivo_Previsualizacion)
  } catch(err) {
    errorLoguer.log(err)
  }
  const data = await storeProcedure("EliminarLibro", { Codigo: codigo });
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo }, usuario);

  return true;
};

module.exports = servicio;
