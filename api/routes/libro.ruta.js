const router = require('express').Router()
const servicio = require('../services/libro.servicio')


router.get('/libro', async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json({ success: true, data })
    } catch (error) {
        next(error)
    }
})

router.get('/libro/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.codigo)
        return res.json({ success: true, data })
    } catch (error) {
        next(error)
    }
})

router.post('/libro', async (req, res, next) => {
    try {
        const data = await servicio.insertar(req.body)
        return res.json({ success: true, data })
    } catch (error) {
        next(error)
    }
})

router.put('/libro', async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body)
        return res.json({ success: true, data })
    } catch (error) {
        next(error)
    }
})

router.delete('/libro/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.codigo)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})


module.exports = router;