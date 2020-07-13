const db =  require('../db')
const { encrypt, decrypt } = require('./encrypt.utils')
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
        let parametrosEncrytados = {}
        for (let property in parametros) {
            if (parametros.hasOwnProperty(property)) {
                let value = parametros[property]
                parametrosEncrytados[property] = typeof(value) === 'string' && !property.includes('Codigo') ? encrypt(value) : value
            }         
        }

        opts.replacements = parametrosEncrytados 
    }

    const data = await db.query(`dbo.${nombre} ${reemplazarStringStoreProcedure(parametros)}`, opts).catch(err => { throw err })

    if(data && data[0].length == 1) {
        return desencriptarObjeto(data[0][0])
    } else {
        data[0].forEach(item => {
            item = desencriptarObjeto(item)
        })
        return data[0]
    }
}

/**
 * Desencripta todos los campos de un objeto.
 * 
 * @param {object} objeto objeto a desencriptar.
 */
function desencriptarObjeto(objeto) {
    for (let property in objeto) {
        if (objeto.hasOwnProperty(property)) {
            let value = objeto[property]
            objeto[property] = typeof(value) === 'string' && !property.includes('Codigo') ? decrypt(value) : value
        }         
    }
    return objeto
}

module.exports = servicio