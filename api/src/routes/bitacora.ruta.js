const router = require("express").Router();
const servicio = require("../services/bitacora.servicio");

router.get("/bitacora", async (req, res, next) => {
  try {
    const data = await servicio.obtener(req.query);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/bitacora/:Id", async (req, res, next) => {
  try {
    const data = await servicio.obtenerUno(req.params.Id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/bitacora", async (req, res, next) => {
  try {
    const data = await servicio.insertar(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/bitacora", async (req, res, next) => {
  try {
    const data = await servicio.modificar(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/bitacora/:Id", async (req, res, next) => {
  try {
    const data = await servicio.eliminar(req.params.Id);
    return res.json({ success: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
