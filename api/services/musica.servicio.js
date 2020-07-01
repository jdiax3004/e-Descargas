const db =  require('../db')
const { reemplazarStringStoreProcedure } = require('../utils/string.utils')

let servicio = {}

servicio.insertar = async (objeto) => {
    try {
        // TODO: generer consecutivos ejemplo: objeto.Codigo = consecutiovos.generar()
        const data = await db.query(`dbo.InsertarMusica ${reemplazarStringStoreProcedure(objeto)}`, { 
            replacements: objeto 
        })
        // TODO: guardar registro en la bitacora
        // TODO: devolver el objeto creado
    } catch(error) {
        // TODO: hacer logueo del error
    }
}

servicio.modificar = async (objeto) => {
    // TODO: generador de consecutivos
    try {
        await db.query(`dbo.ModificarMusica ${reemplazarStringStoreProcedure(objeto)}`, { 
            replacements: objeto  
        })

    } catch(error) {
        // TODO: hacer logueo del error
    }
} 

// obtener

// eliminar

module.exports = servicio