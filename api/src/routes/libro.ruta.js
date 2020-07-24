const router = require('express').Router()
const servicio = require('../services/libro.servicio')
const { isAuth } = require('../security/auth')

router.get('/libro', async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/libro/:codigo', isAuth([1, 4]), async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.codigo)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/libro', isAuth([1, 4]), async (req, res, next) => {
    try {
        const data = await servicio.insertar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.put('/libro', isAuth([1, 4]), async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/libro/:codigo', isAuth([1, 4]), async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.codigo, req.user)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})

module.exports = router;