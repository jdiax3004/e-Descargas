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
            array = array.filter(obj => {
                return obj[filtro] === filtros[filtro]
            })
        }         
    }
    return array
}

module.exports = arrayUtils