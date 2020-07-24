let arrayUtils = {}

/**
 * Toma un array y lo devuelve filtrado.
 * 
 * @param {array} array    array a filtrar.
 * @param {object} filtros filtros a buscar.
 */
arrayUtils.filtrar = (array, filtros) => {
    for (let filtro in filtros) {
        if (filtros.hasOwnProperty(filtro)) {
            let valor = filtros[filtro]
            if(valor) {
                array = array.filter(obj => {
                    let trydate = new Date(obj[filtro])

                    if(trydate instanceof Date) {
                        try {
                            return trydate.getTime() >= new Date(valor).getTime() 
                        } catch(err) {
                            return false
                        }
                    }

                    if(typeof obj[filtro] === 'string')
                        return obj[filtro].includes(valor)
                    
                    return obj[filtro] == valor
                })
            } 
        }         
    }
    return array
}

module.exports = arrayUtils