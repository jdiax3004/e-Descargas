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

require("./security/passport")(passport);

// server settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(cors());
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
  multer({ dest: path.join(__dirname, "..", "public/upload/temp") }).single(
    "file"
  )
);

// static files
// app.use(express.static(path.join(__dirname, "..", "public")))

// routes
app.use(process.env.API_PATH, require("./routes/consecutivo.ruta"));
app.use(process.env.API_PATH, require("./routes/musica.ruta"));
app.use(process.env.API_PATH, require("./routes/libro.ruta"));
app.use(process.env.API_PATH, require("./routes/peliculas.ruta"));
app.use(process.env.API_PATH, require("./routes/transaccion.ruta"));
app.use(process.env.API_PATH, require("./routes/usuarios.ruta"));

// handle erros
app.use((err, req, res, next) => {
  errorLogger.log(err);
  return res.status(501).json({ success: false, errors: err.message });
});

module.exports = app;
