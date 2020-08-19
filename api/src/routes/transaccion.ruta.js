const router = require('express').Router()
const servicio = require('../services/transaccion.servicio')
const { isAuth, ensureAuthenticated } = require('../security/auth')

router.get('/transacciones', ensureAuthenticated, async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/transacciones/:codigo',ensureAuthenticated, async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.codigo)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/captcha', async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

router.post('/transacciones', ensureAuthenticated, async (req, res, next) => {
    try {
        req.body.Codigo_usuario = req.user.Codigo
        const data = await servicio.insertar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.put('/transacciones', async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/transacciones/:codigo', ensureAuthenticated, async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.codigo, req.user)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})


module.exports = router