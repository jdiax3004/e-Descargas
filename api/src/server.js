const express = require("express");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const app = express();
const errorLogger = require("./log/error.log");

//Configuración Passport
require("./security/passport")(passport);

// Configuración Servidor
app.set("port", process.env.PORT || 3000);

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(cors({ 
  origin: ["http://localhost:4200", "http://127.0.0.1:4200", "https://fonts.gstatic.com"],
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      secure: false,
    },
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(
  multer({ dest: path.join(__dirname, "..", "public/temp/") }).array("file")
);

// Rutas
app.use(process.env.API_PATH, require("./routes/consecutivo.ruta"));
app.use(process.env.API_PATH, require("./routes/musica.ruta"));
app.use(process.env.API_PATH, require("./routes/libro.ruta"));
app.use(process.env.API_PATH, require("./routes/peliculas.ruta"));
app.use(process.env.API_PATH, require("./routes/transaccion.ruta"));
app.use(process.env.API_PATH, require("./routes/usuarios.ruta"));
app.use(process.env.API_PATH, require("./routes/rol.ruta"));
app.use(process.env.API_PATH, require("./routes/parametros.ruta"));
app.use(process.env.API_PATH, require("./routes/genero-musica.ruta"));
app.use(process.env.API_PATH, require("./routes/genero-pelicula.ruta"));
app.use(process.env.API_PATH, require("./routes/genero-libro.ruta"));
app.use(process.env.API_PATH, require("./routes/idiomas.ruta"));
app.use(process.env.API_PATH, require("./routes/descargas.ruta"));
app.use(process.env.API_PATH, require("./routes/bitacora.ruta"));
app.use(process.env.API_PATH, require("./routes/errores.ruta"));



// Manejo de Errores
app.use((err, req, res, next) => {
  errorLogger.log(err);
  return res.status(501).json({ success: false, message: err.message });
});

module.exports = app;