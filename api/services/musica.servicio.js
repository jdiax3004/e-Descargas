const db = require("../db");
const { storeProcedure } = require("./base-servicio");
const errorLogger = require("../log/error.log");
const bitacora = require("../log/bitacora.log");

let servicio = {};

servicio.obtener = async () => {
  return await storeProcedure("ObtenerMusica");
};

servicio.obtenerUno = async (codigo) => {
  return await storeProcedure("ObtenerMusica", { Codigo: codigo });
};

servicio.insertar = async (objeto) => {
  // TODO: generer consecutivos ejemplo: objeto.Codigo = consecutiovos.generar()
  const data = await storeProcedure("InsertarMusica", objeto);
  bitacora.log(bitacora.INSERTAR, data);
  return data;
};

servicio.modificar = async (objeto) => {
  const data = await storeProcedure("ModificarMusica", objeto);
  bitacora.log(bitacora.MODIFICAR, data);

  return data;
};

servicio.eliminar = async (codigo) => {
  const data = await storeProcedure("EliminarMusica", { Codigo: codigo });
  bitacora.log(bitacora.ELIMINAR, { Codigo: codigo });

  return true;
};

module.exports = servicio;
