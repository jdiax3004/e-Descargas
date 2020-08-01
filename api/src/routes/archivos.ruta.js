const router = require('express').Router()
const servicio = require('../services/archivos.servicio')
const { isAuth } = require('../security/auth')

router.post('/archivos', isAuth([1, 4]), async (req, res, next) => {
    try {
        const { tipo } = req.body

        if(!req.file) throw new Error("No se pudo subir el archivo.")
        if(!tipo) throw new Error("Se debe especificar el tipo.")

        const url = await servicio.subir(req.file, tipo)
 
        return res.json({ url })
    } catch (error) {
        next(error)
    }
})

module.exports = router