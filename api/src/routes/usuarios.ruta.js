const router = require('express').Router()
const servicio = require('../services/usuarios.servicio')

router.get('/usuarios', async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/usuarios/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.codigo)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/usuarios', async (req, res, next) => {
    try {
        const data = await servicio.insertar(req.body)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.put('/usuarios', async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/usuarios/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.codigo)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})


module.exports = router