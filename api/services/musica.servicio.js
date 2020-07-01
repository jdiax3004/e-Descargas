const db =  require('../db')
const { storeProcedure } = require('./base-servicio')

let servicio = {}

servicio.insertar = async (objeto) => {
    try {
        // TODO: generer consecutivos ejemplo: objeto.Codigo = consecutiovos.generar()
        const data = await storeProcedure('InsertarMusica', objeto)
        // TODO: guardar registro en la bitacora
        // TODO: devolver el objeto creado
    } catch(error) {
        // TODO: hacer logueo del error
    }
}

servicio.modificar = async (objeto) => {
    try {
        // TODO: generer consecutivos ejemplo: objeto.Codigo = consecutiovos.generar()
        const data = await storeProcedure('ModificarMusica', objeto)
        // TODO: guardar registro en la bitacora
        // TODO: devolver el objeto creado

    } catch(error) {
        // TODO: hacer logueo del error
    }
} 

// obtener

// eliminar

module.exports = servicio