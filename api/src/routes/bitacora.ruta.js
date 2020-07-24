const router = require("express").Router();
const servicio = require("../services/bitacora.servicio");
const { isAuth } = require('../security/auth')

router.get("/bitacora", isAuth([1, 5]), async (req, res, next) => {
  try {
    const data = await servicio.obtener(req.query);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/bitacora/:Id", isAuth([1, 5]), async (req, res, next) => {
  try {
    const data = await servicio.obtenerUno(req.params.Id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/bitacora", isAuth([1, 5]), async (req, res, next) => {
  try {
    const data = await servicio.insertar(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/bitacora", isAuth([1, 5]), async (req, res, next) => {
  try {
    const data = await servicio.modificar(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/bitacora/:Id", isAuth([1, 5]), async (req, res, next) => {
  try {
    const data = await servicio.eliminar(req.params.Id);
    return res.json({ success: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
