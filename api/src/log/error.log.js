const { storeProcedure } = require("utils/db.utils")({ db: require('../db') })

let logger = {}

/**
 * Guarda un error en base de datos.
 * 
 * @param {object} error objeto de excepcion.
 */
logger.log = (error) => {
    let obj = {
        Mensaje:      error.message ? error.message.substr(0, 500) : 'Error desconocido',
        Descripcion:  error.stack ? error.stack.substr(0, 500) : '',
        Codigo_Error: error.code || -1,
        Fecha:        new Date()
    }

    if(process.env.NODE_ENV === 'development') console.log(error)
    
    storeProcedure('InsertarError', obj).catch(err => {
        console.log(err)
    })
}

module.exports = logger