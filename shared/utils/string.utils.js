let stringUtils = {}

/**
 * Genera un string para parametros de store procedure.
 * 
 * @param {Object} objeto objeto base.
 */
stringUtils.reemplazarStringStoreProcedure = (objeto) => {
    let str = ''
    let first = true
    for (let property in objeto) {
        if (objeto.hasOwnProperty(property)) {
            if(first) {
                str += `@${property} = :${property}`
                first = false
            }
            else 
                str += `, @${property} = :${property}`
        }         
    }
    return str
}

module.exports = stringUtils