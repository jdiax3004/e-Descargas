const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')
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

servicio.insertar = async (objeto) => {
  objeto.Codigo = await consecutivo.generar(consecutivo.LIBRO)
  const data = await storeProcedure("InsertarLibro", objeto);
  bitacora.log(bitacora.INSERTAR, data);
  return data;
};

servicio.modificar = async (objeto) => {
  const data = await storeProcedure("ModificarLibro", objeto);
  bitacora.log(bitacora.MODIFICAR, data);

  return data;
};

servicio.eliminar = async (codigo) => {
  const data = await storeProcedure("EliminarLibro", { Codigo: codigo });
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo });

  return true;
};

module.exports = servicio;
