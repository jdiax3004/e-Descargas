const { storeProcedure } = require('../utils/db.utils')

let logger = {}

/**
 * Guarda un error en base de datos.
 * 
 * @param {object} error objeto de excepcion.
 */
logger.log = (error) => {
    let obj = {
        Mensaje:      error.message,
        Descripcion:  error.stack,
        Codigo_Error: error.code || -1,
        Fecha:        new Date()
    }

    if(process.env.NODE_ENV === 'development') console.log(error)
    
    storeProcedure('InsertarError', obj).catch(err => {
        console.log(err)
    })
}

module.exports = logger