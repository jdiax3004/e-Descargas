const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')

let servicio = {};

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerBitacora")
  if(filtros) result = filtrar(result, filtros)
  
  return result
};

servicio.obtenerUno = async (id) => {
  return await storeProcedure("ObtenerBitacora", { Id: id });
};

servicio.insertar = async (objeto) => {
  const data = await storeProcedure("InsertarBitacocra", objeto);
  bitacora.log(bitacora.INSERTAR, data);
  return data;
};

servicio.modificar = async (objeto) => {
  const data = await storeProcedure("ModificarBitacocra", objeto);
  bitacora.log(bitacora.MODIFICAR, data);

  return data;
};

servicio.eliminar = async (id) => {
  const data = await storeProcedure("EliminarBitacocra", { Id: id });
  bitacora.log(bitacora.ELIMINAR, { Id: id });

  return true;
};

module.exports = servicio;
