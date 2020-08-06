const router = require('express').Router()
const servicio = require('../services/easypay.servicio')
const { isAuth, ensureAuthenticated } = require('../security/auth')

router.get('/easypay', async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/easypay/:codigo', async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.codigo)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/easypay', ensureAuthenticated, async (req, res, next) => {
    try {
        req.body.Codigo_Usuario = req.user.Codigo
        const data = await servicio.insertar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.put('/easypay', ensureAuthenticated, async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/easypay/:codigo', ensureAuthenticated, async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.codigo, req.user)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})


module.exports = router