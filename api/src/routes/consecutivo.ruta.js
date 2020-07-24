const router = require('express').Router()
const servicio = require('../services/consecutivo.servicio')
const { isAuth } = require('../security/auth')

router.get('/consecutivos', isAuth([1, 3, 4]), async (req, res, next) => {
    try {
        const data = await servicio.obtener(req.query)

        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/consecutivos/:Id', isAuth([1, 3, 4]), async (req, res, next) => {
    try {
        const data = await servicio.obtenerUno(req.params.Id)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.post('/consecutivos', isAuth([1, 3, 4]), async (req, res, next) => {
    try {
        const data = await servicio.insertar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.put('/consecutivos', isAuth([1, 3, 4]), async (req, res, next) => {
    try {
        const data = await servicio.modificar(req.body, req.user)
        return res.json(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/consecutivos/:Id', isAuth([1, 3, 4]), async (req, res, next) => {
    try {
        const data = await servicio.eliminar(req.params.Id, req.user)
        return res.json({ success: data })
    } catch (error) {
        next(error)
    }
})


module.exports = router