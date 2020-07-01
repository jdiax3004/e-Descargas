const db =  require('../db')
const { reemplazarStringStoreProcedure } = require('../utils/string.utils')

let servicio = {}

/**
 * Ejecuta un store procedure de la base de datos.
 * 
 * @param {string} nombre     nombre del store procedure.
 * @param {Object} parametros (opcional) parámetros del store procedure.
 */
servicio.storeProcedure = async (nombre, parametros) => {
    let opts = {}

    if(parametros) {
        opts.replacements = parametros 
    }

    const data = await db.query(`dbo.${nombre} ${reemplazarStringStoreProcedure(parametros)}`, opts)

    return data
}

module.exports = servicio