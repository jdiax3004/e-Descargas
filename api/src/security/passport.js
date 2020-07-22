const LocalStrategy = require("passport-local").Strategy;
const usuarios = require("../services/usuarios.servicio");

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

  passport.serializeUser((user, done) => {
    done(null, user.Codigo);
  });

  passport.deserializeUser((id, done) => {
    usuarios.obtenerUno({ Codigo: id }).then((err, user) => {
      done(err, user);
    });
  });
};
