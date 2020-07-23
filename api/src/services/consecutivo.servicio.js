const { storeProcedure } = require("utils/db.utils")({ db: require('../db') });
const { filtrar } = require("utils/array.utils");
const bitacora = require("../log/bitacora.log");

let servicio = {};

// Tipos de Consecutivos
servicio.LIBRO = "Libro";
servicio.MUSICA = "Musica";
servicio.USUARIO = "Usuario";
servicio.PELICULA = "Pelicula";
servicio.TRANSACCION = "Transaccion";

servicio.obtener = async (filtros) => {
  let result = await storeProcedure("ObtenerConsecutivo");
  if (filtros) result = filtrar(result, filtros);

  return result;
};

servicio.obtenerUno = async (id) => {
  return await storeProcedure("ObtenerConsecutivo", { Id: id });
};

servicio.insertar = async (objeto, usuario) => {
  const data = await storeProcedure("InsertarConsecutivo", objeto);
  bitacora.log(bitacora.INSERTAR, data, usuario);
  return data;
};

servicio.modificar = async (objeto, usuario) => {
  const data = await storeProcedure("ModificarConsecutivo", objeto);
  bitacora.log(bitacora.MODIFICAR, data, usuario);

  return data;
};

servicio.eliminar = async (id, usuario) => {
  const data = await storeProcedure("EliminarConsecutivo", { Id: id });
  bitacora.log(bitacora.ELIMINAR, { Id: id }, usuario);

  return true;
};

servicio.generar = async (tipo) => {
  let consecutivo = (await servicio.obtener({ Descripcion: tipo }))[0];
  if (!consecutivo) throw new Error(`No se encontró consecutivo para ${tipo}.`);
  let codigo = consecutivo.Posee_Prefijo ? consecutivo.Prefijo : "";
  if (!consecutivo.Consecutivo)
    consecutivo.Consecutivo = consecutivo.Rango_Inicio - 1;
  consecutivo.Consecutivo++;
  if (consecutivo.Consecutivo > consecutivo.Rango_Final)
    throw new Error(
      `Se ha alcanzado el límite de rango para el consecutivo de ${tipo}.`
    );
  await servicio.modificar(consecutivo).catch((err) => {
    throw err;
  });
  codigo += consecutivo.Consecutivo;

  return codigo;
};

module.exports = servicio;
