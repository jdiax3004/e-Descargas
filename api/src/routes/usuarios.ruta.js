const router = require("express").Router();
const servicio = require("../services/usuarios.servicio");
const passport = require("passport");

// Autenticación Usuarios

router.post("/login", passport.authenticate("local"), (req, res) => {
  try {
    return res.status(200).send(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  try {
    req.logout();
    req.session.destroy((err) => {
      next(err);
    });
    return res.json(true);
  } catch (error) {
    next(error);
  }
});

router.get("/actual", (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.get("/recuperar-contrasenna", async (req, res, next) => {
  try {
    const data = await servicio.obtener(req.query);
    return res.json({
      Codigo: data[0].Codigo,
      Pregunta_Seguridad: data[0].Pregunta_Seguridad,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/recuperar-contrasenna", async (req, res, next) => {
  try {
    const data = await servicio.contrasenna(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook"),(req, res) => {
    try {
      return res.status(200).send(req.user);
    } catch (error) {
      next(error);
    }
  }
);

// CRUD Usuarios

router.get("/usuarios", async (req, res, next) => {
  try {
    const data = await servicio.obtener(req.query);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/usuarios/:codigo", async (req, res, next) => {
  try {
    const data = await servicio.obtenerUno(req.params.codigo);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/usuarios", async (req, res, next) => {
  try {
    const data = await servicio.insertar(req.body, req.user);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put("/usuarios", async (req, res, next) => {
  try {
    const data = await servicio.modificar(req.body, req.user);
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/usuarios/:codigo", async (req, res, next) => {
  try {
    const data = await servicio.eliminar(req.params.codigo, req.user);
    return res.json({ success: data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
