const { storeProcedure } = require("utils/db.utils")({ db: require('../db') })
const errorLogger = require('./error.log')

let bitacora = {}

// tipos de acciones
bitacora.INSERTAR  = 'Insertar'
bitacora.MODIFICAR = 'Modificar'
bitacora.ELIMINAR  = 'Eliminar'

bitacora.log = (tipo, objeto, usuario) => {
    let Codigo_Usuario = usuario && usuario.Codigo ? usuario.Codigo : 'US_1'

    let obj = {
        Codigo_Usuario,
        Codigo_Registro:  objeto.Codigo || objeto.Id,
        Tipo:             tipo,
        Descripcion:      `${tipo} ${objeto.Codigo || objeto.Id}`,
        Detalle_Registro: JSON.stringify(objeto),
        Fecha:            new Date()
    }

    storeProcedure('InsertarBitacora', obj).catch(errorLogger.log)
}


module.exports = Object.freeze(bitacora)