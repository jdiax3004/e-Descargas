const router = require('express').Router()
const servicio = require('../services/transaccion.servicio')

router.get('/transaccion', async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/transaccion/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.codigo)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/transaccion', async (req, res, next) => {
    try {
        const data = await servicio.insertar(req.body)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.put('/transaccion', async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/transaccion/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.codigo)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})


module.exports = router