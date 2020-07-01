const express = require('express')
const router = express.Router()

const servicio = require('../services/musica.servicio')


router.post('/musica', async (req, res, next) => {
    try {
        const obj = await servicio.insertar(req.body)
        return res.json({ success: true })
    } catch (error) {
        next(error)
    }
})


module.exports = router;