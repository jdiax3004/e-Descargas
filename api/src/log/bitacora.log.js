const { storeProcedure } = require("utils/db.utils")({ db: require('../db') })
const errorLogger = require('./error.log')

let bitacora = {}

// tipos de acciones
bitacora.INSERTAR  = 'Insertar'
bitacora.MODIFICAR = 'Modificar'
bitacora.ELIMINAR  = 'Eliminar'

bitacora.log = (tipo, objeto) => {
    let obj = {
        Codigo_Usuario:   'US_1', // TODO: hay que buscar una forma de obtener el usuario logueado
        Codigo_Registro:  objeto.Codigo || objeto.Id,
        Tipo:             tipo,
        Descripcion:      `${tipo} `,
        Detalle_Registro: JSON.stringify(objeto),
        Fecha:            new Date()
    }

    storeProcedure('InsertarBitacora', obj).catch(errorLogger.log)
}


module.exports = Object.freeze(bitacora)