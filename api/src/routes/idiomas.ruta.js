const router = require('express').Router()
const servicio = require('../services/idiomas.servicio')

router.get('/idiomas', async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/idiomas/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.codigo)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router