const router = require('express').Router()
const servicio = require('../services/peliculas.servicio')

router.get('/peliculas', async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/peliculas/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.codigo)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/peliculas', async (req, res, next) => {
    try {
        const data = await servicio.insertar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.put('/peliculas', async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/peliculas/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.codigo, req.user)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})


module.exports = router