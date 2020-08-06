const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const usuarios = require("../services/usuarios.servicio");
const { randomNumber } = require("../utils/random.utils");
const dotenv = require("dotenv");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "Usuario",
        passwordField: "Contrasenna",
      },
      function (username, password, done) {
        usuarios.obtener({ Usuario: username }).then((users) => {
          let user = users[0];
          if (!user) {
            return done(null, false, { message: "Usuario Incorrecto" });
          }
          if (user.Contrasenna != password) {
            return done(null, false, { message: "Contraseña Incorrecta" });
          }
          return done(null, user);
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/api/v1/auth/facebook/callback",
        profileFields: ["email", "id", "first_name", "last_name"],
      },
      function (accessToken, refreshToken, profile, done) {
        usuarios
          .obtener({ Correo: profile.emails[0].value })
          .then((users) => {
            let user = users[0];
            if (user) {
              return done(null, user);
            } else {
              var newUser = {
                Usuario: profile.id,
                Nombre: profile.name.givenName,
                Primer_Apellido: profile.name.familyName,
                Segundo_Apellido: "",
                Correo: profile.emails[0].value,
                Contrasenna: randomNumber(),
                Pregunta_Seguridad: randomNumber(),
                Respuesta_Seguridad: randomNumber(),
              };
              usuarios.insertar(newUser);
              return done(null, user);
            }
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.Codigo);
  });

  passport.deserializeUser((id, done) => {
    usuarios.obtenerUno(id).then((user) => {
      done(null, user);
    });
  });
};
