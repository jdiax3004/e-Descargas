const router = require('express').Router()
const servicio = require('../services/consecutivo.servicio')

router.get('/consecutivos', async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/consecutivos/:Id', async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.Id)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/consecutivos', async (req, res, next) => {
    try {
        const data = await servicio.insertar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.put('/consecutivos', async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/consecutivos/:Id', async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.Id, req.user)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})


module.exports = router