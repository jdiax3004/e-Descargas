const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require('../log/bitacora.log')

let servicio = {}

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerGeneroLibro")
  if(filtros) result = filtrar(result, filtros)

  return result
}

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerGeneroLibro", { Id: codigo })
}

servicio.insertar = async (objeto, usuario) => {
  const data = await storeProcedure("InsertarGeneroLibro", objeto)
  bitacora.log(bitacora.INSERTAR, data, usuario)
  return data
}

module.exports = servicio