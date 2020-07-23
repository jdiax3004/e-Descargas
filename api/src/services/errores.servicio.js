const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')

let servicio = {};

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerErrores")
  console.log("Hola"+result);
  if(filtros) result = filtrar(result, filtros)
  
  return result
};

servicio.obtenerUno = async (id) => {
  return await storeProcedure("ObtenerErrores", { Id: id });
};

servicio.insertar = async (objeto) => {
  const data = await storeProcedure("InsertarErrores", objeto);
  bitacora.log(bitacora.INSERTAR, data);
  return data;
};

servicio.modificar = async (objeto) => {
  const data = await storeProcedure("ModificarErrores", objeto);
  bitacora.log(bitacora.MODIFICAR, data);

  return data;
};

servicio.eliminar = async (id) => {
  const data = await storeProcedure("EliminarErrores", { Id: id });
  bitacora.log(bitacora.ELIMINAR, { Id: id });

  return true;
};

module.exports = servicio;
