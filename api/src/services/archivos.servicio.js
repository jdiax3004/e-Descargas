const fileUtils = require('../utils/file.utils')
const parametros = require('./parametros.servicio')

let servicio = {}

servicio.subir = async (archivo, tipo) => {
  const parametro = (await parametros.obtener({
    Nombre: tipo
  }))[0]

  return await fileUtils.upload(archivo, parametro.Valor)
}

servicio.eliminar = async (path) => {
  return await fileUtils.delete(path)
}

module.exports = servicio