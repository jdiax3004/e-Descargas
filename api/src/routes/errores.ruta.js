const router = require("express").Router();
const servicio = require("../services/errores.servicio");
const { isAuth } = require('../security/auth')

router.get("/errores", isAuth([1, 5]), async (req, res, next) => {
  try {
    const data = await servicio.obtener(req.query);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/errores/:Id", isAuth([1, 5]), async (req, res, next) => {
  try {
    const data = await servicio.obtenerUno(req.params.Id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/errores", isAuth([1, 5]), isAuth([1, 5]), async (req, res, next) => {
  try {
    const data = await servicio.insertar(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/errores", isAuth([1, 5]), async (req, res, next) => {
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
