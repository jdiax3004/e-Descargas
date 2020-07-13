let arrayUtils = {}

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