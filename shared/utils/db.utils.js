const { encrypt, decrypt } = require('./encrypt.utils')
const { reemplazarStringStoreProcedure } = require('./string.utils')

/**
 * Utilidades para base de datos.
 * 
 * @param {db} db instancia de base de datos sequelize.
 */
module.exports = ({ db }) => {
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

    if (parametros) {
      let parametrosEncrytados = {}
      for (let property in parametros) {
        if (parametros.hasOwnProperty(property)) {
          let value = parametros[property]
          parametrosEncrytados[property] = debeEncriptarse(property) ? encrypt(value) : value
        }
      }

      opts.replacements = parametrosEncrytados
    }

    const data = await db.query(`dbo.${nombre} ${reemplazarStringStoreProcedure(parametros)}`, opts).catch(err => { throw err })

    if (data && data[0].length == 1) {
      let item = desencriptarObjeto(data[0][0])
      return nombre.includes('Obtener') && (!parametros || (!parametros.Codigo && !parametros.Id)) ? [item] : item
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
        objeto[property] = debeEncriptarse(property) ? decrypt(value) : value
      }
    }
    return objeto
  }

  /**
   * Indica si la columna deberia encriptarse o no.
   * 
   * @param {string} propiedad nombre de la columna.
   */
  function debeEncriptarse(propiedad) {
    return !propiedad.includes('Id_') && !propiedad.includes('Codigo_') && propiedad != 'Id' && propiedad != 'Codigo'
  }

  return servicio

}