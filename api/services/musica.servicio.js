const db =  require('../db')
const { storeProcedure } = require('../utils/db.utils')
const errorLogger = require('../log/error.log')
const bitacora = require('../log/bitacora.log')

let servicio = {}

servicio.obtener = async () => {
    try {
        return await storeProcedure('ObtenerMusica')
    } catch(error) {
        errorLogger.log(error)
        return null
    }
}

servicio.obtenerUno = async (codigo) => {
    try {
        return await storeProcedure('ObtenerMusica', { Codigo: codigo })
    } catch(error) {
        errorLogger.log(error)
        return null
    }
}

servicio.insertar = async (objeto) => {
    try {
        // TODO: generer consecutivos ejemplo: objeto.Codigo = consecutiovos.generar()
        const data = await storeProcedure('InsertarMusica', objeto)
        bitacora.log(bitacora.INSERTAR, data)

        return data
    } catch(error) {
        errorLogger.log(error)
        return null
    }
}

servicio.modificar = async (objeto) => {
    try {
        const data = await storeProcedure('ModificarMusica', objeto)
        bitacora.log(bitacora.MODIFICAR, data)
        
        return data
    } catch(error) {
        errorLogger.log(error)
        return null
    }
}

servicio.eliminar = async (codigo) => {
    try {
        const data = await storeProcedure('EliminarMusica', { Codigo: codigo })
        bitacora.log(bitacora.ELIMINAR, { Codigo: codigo })
        
        return true
    } catch(error) {
        errorLogger.log(error)
        return false
    }
}


module.exports = servicio