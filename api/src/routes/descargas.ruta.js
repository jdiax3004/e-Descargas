const router = require("express").Router();
const servicio = require("../services/decargas.servicio");

router.get("/descargas", async (req, res, next) => {
  try {
    const data = await servicio.obtener(req.query);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/descargas/:Id", async (req, res, next) => {
  try {
    const data = await servicio.obtenerUno(req.params.Id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/descargas", async (req, res, next) => {
  try {
    const data = await servicio.insertar(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/descargas", async (req, res, next) => {
  try {
    const data = await servicio.modificar(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/descargas/:Id", async (req, res, next) => {
  try {
    const data = await servicio.eliminar(req.params.Id);
    return res.json({ success: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
