const db =  require('../db')
const { reemplazarStringStoreProcedure } = require('./string.utils')

let servicio = {}

/**
 * Ejecuta un store procedure de la base de datos.
 * 
 * @param {string} nombre     nombre del store procedure.
 * @param {Object} parametros (opcional) parámetros del store procedure.
 */
servicio.storeProcedure = async (nombre, parametros) => {
    let opts = {
        raw: false
    }

    if(parametros) {
        opts.replacements = parametros 
    }

    const data = await db.query(`dbo.${nombre} ${reemplazarStringStoreProcedure(parametros)}`, opts).catch(err => { throw err })

    return data && data[0].length == 1 ? data[0][0] : data[0]
}

module.exports = servicio