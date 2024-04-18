const passport = require("passport");
const ModeloUsuario = require("../modelos/modelo_usuario");
const jwtStartegia = require("passport-jwt").Strategy;
const extraerJWT = require("passport-jwt").ExtractJwt;
const JWT = require("jsonwebtoken");
const moment = require("moment");
const expiracionTiempo = moment.duration(15, "minutes").asSeconds();
const miclave = "MiclaveSeguridad";

exports.getToken = (datos) => {
  console.log(datos);
  return JWT.sign(datos, miclave, { expiresIn: expiracionTiempo });
};

const opciones = {
  jwtFromRequest: extraerJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: miclave,
};

passport.use(
  new jwtStartegia(opciones, async (payload, done) => {
    console.log(payload);
    return await ModeloUsuario.findOne({
      where: {
        id: payload.id,
      },
    })
      .then((data) => {
        return done(null, data.id);
      })
      .catch((err) => {
        return done(null, false);
      });
  })
);

exports.ValidarAutenticado = passport.authenticate("jwt", {
  session: false,
  failureRedirect: "/api/autenticacion/error",
});
