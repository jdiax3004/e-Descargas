const { storeProcedure } = require('../services/base-servicio')
const errorLogger = require('./error.log')

let bitacora = {}

// tipos de acciones
bitacora.INSERTAR  = 'Insertar'
bitacora.MODIFICAR = 'Modificar'
bitacora.ELIMINAR  = 'Eliminar'

bitacora.log = (tipo, objeto) => {
    let obj = {
        Id_Usuario:       1, // TODO: hay que buscar una forma de obtener el usuario logueado
        Codigo_Registro:  objeto.Codigo,
        Tipo:             tipo,
        Descripcion:      `${tipo} `,
        Detalle_Registro: JSON.stringify(objeto)
    }

    storeProcedure('InsertarBitacora', obj).catch(errorLogger.log)
}


module.exports = Object.freeze(bitacora)