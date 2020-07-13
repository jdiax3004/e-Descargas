const { storeProcedure } = require('../utils/db.utils')
const bitacora = require('../log/bitacora.log')

let servicio = {}

servicio.obtener = async () => {
  return await storeProcedure("ObtenerConsecutivo")
}

servicio.obtenerUno = async (id) => {
  return await storeProcedure("ObtenerConsecutivo", { Id: id })
}

servicio.insertar = async (objeto) => {
  // TODO: generer consecutivos ejemplo: objeto.Codigo = consecutiovos.generar()
  const data = await storeProcedure("InsertarConsecutivo", objeto)
  bitacora.log(bitacora.INSERTAR, data)
  return data
}

servicio.modificar = async (objeto) => {
  const data = await storeProcedure("ModificarConsecutivo", objeto)
  bitacora.log(bitacora.MODIFICAR, data)

  return data
}

servicio.generar = async (tipo) => {
    let todos = await servicio.obtener()
    todos.
}

module.exports = servicio
