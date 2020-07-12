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
        Codigo_Error: -1 // TODO: como vamos a saber el codigo? podriamos reemplazarlo por severidad? o ambiente?
    }

    if(process.env.NODE_ENV === 'development') console.log(error)
    
    storeProcedure('InsertarError', obj).catch(err => {
        console.log(err)
    })
}

module.exports = logger