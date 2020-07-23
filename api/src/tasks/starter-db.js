const dotenv = require("dotenv");
dotenv.config();
const db = require("../db");
const { storeProcedure } = require("utils/db.utils")({ db: require("../db") });
const consecutivo = require("../services/consecutivo.servicio");
const usuarios = require("../services/usuarios.servicio");

async function exec() {
  await db.authenticate();

  await crearConsecutivos();
  await crearRoles();
  await crearUsuarios();
  await crearIdiomas();
  await crearGenerosMusica();
  await crearGenerosLibros();
  await crearGenerosPeliculas();
}

async function crearConsecutivos() {
  await consecutivo.insertar({
    Descripcion: consecutivo.USUARIO,
    Consecutivo: null,
    Posee_Prefijo: true,
    Prefijo: "US_",
    Rango_Inicio: 1,
    Rango_Final: 10000,
  });

  await consecutivo.insertar({
    Descripcion: consecutivo.TRANSACCION,
    Consecutivo: null,
    Posee_Prefijo: true,
    Prefijo: "PAG_",
    Rango_Inicio: 1,
    Rango_Final: 10000,
  });

  await consecutivo.insertar({
    Descripcion: consecutivo.MUSICA,
    Consecutivo: null,
    Posee_Prefijo: true,
    Prefijo: "MUS_",
    Rango_Inicio: 1,
    Rango_Final: 10000,
  });

  await consecutivo.insertar({
    Descripcion: consecutivo.LIBRO,
    Consecutivo: null,
    Posee_Prefijo: true,
    Prefijo: "LIB_",
    Rango_Inicio: 1,
    Rango_Final: 10000,
  });

  await consecutivo.insertar({
    Descripcion: consecutivo.PELICULA,
    Consecutivo: null,
    Posee_Prefijo: true,
    Prefijo: "PEL_",
    Rango_Inicio: 1,
    Rango_Final: 10000,
  });

  await consecutivo.insertar({
    Descripcion: consecutivo.TRANSACCION,
    Consecutivo: null,
    Posee_Prefijo: true,
    Prefijo: "TRA_",
    Rango_Inicio: 1,
    Rango_Final: 10000,
  });
}

async function crearRoles() {
  await storeProcedure("InsertarRol", {
    Rol: "Admin",
  });
  await storeProcedure("InsertarRol", {
    Rol: "Seguridad",
  });
  await storeProcedure("InsertarRol", {
    Rol: "Consecutivo",
  });
  await storeProcedure("InsertarRol", {
    Rol: "Mantenimiento",
  });
  await storeProcedure("InsertarRol", {
    Rol: "Consulta",
  });
  await storeProcedure("InsertarRol", {
    Rol: "Cliente",
  });
}

async function crearIdiomas() {
  await storeProcedure("InsertarIdioma", {
    Idioma: "Español",
  });
  await storeProcedure("InsertarIdioma", {
    Idioma: "Ingles",
  });
  await storeProcedure("InsertarIdioma", {
    Idioma: "Italiano",
  });
  await storeProcedure("InsertarIdioma", {
    Idioma: "Frances",
  });
  await storeProcedure("InsertarIdioma", {
    Idioma: "Aleman",
  });
}

async function crearGenerosMusica() {
  await storeProcedure("InsertarGeneroMusica", {
    Genero: "Rock",
  });
  await storeProcedure("InsertarGeneroMusica", {
    Genero: "Metal",
  });
  await storeProcedure("InsertarGeneroMusica", {
    Genero: "Punk",
  });
  await storeProcedure("InsertarGeneroMusica", {
    Genero: "Pop",
  });
  await storeProcedure("InsertarGeneroMusica", {
    Genero: "Regueaton",
  });
  await storeProcedure("InsertarGeneroMusica", {
    Genero: "Bachata",
  });
  await storeProcedure("InsertarGeneroMusica", {
    Genero: "Trap",
  });
  await storeProcedure("InsertarGeneroMusica", {
    Genero: "Balada",
  });
}

async function crearUsuarios() {
  await usuarios.insertar({
    Id_Roles: [1],
    Usuario: "jdiazher",
    Nombre: "Julian",
    Primer_Apellido: "Diaz",
    Segundo_Apellido: "Hernandez",
    Correo: "jdiazher@edescargas.com",
    Contrasenna: "abc123",
    Pregunta_Seguridad: "Mama",
    Respuesta_Seguridad: "Pancha",
  });
}

async function crearGenerosLibros() {
  await storeProcedure("InsertarGeneroLibros", {
    Genero: "Fantasia",
  });
  await storeProcedure("InsertarGeneroLibros", {
    Genero: "Suspenso",
  });
  await storeProcedure("InsertarGeneroLibros", {
    Genero: "Ciencia Ficción",
  });
  await storeProcedure("InsertarGeneroLibros", {
    Genero: "Novela",
  });
}

async function crearGenerosPeliculas() {
  await storeProcedure("InsertarGeneroPeliculas", {
    Genero: "Accion",
  });
  await storeProcedure("InsertarGeneroPeliculas", {
    Genero: "Ciencia Ficción",
  });
  await storeProcedure("InsertarGeneroPeliculas", {
    Genero: "Drama",
  });
  await storeProcedure("InsertarGeneroPeliculas", {
    Genero: "Terror",
  });
  await storeProcedure("InsertarGeneroPeliculas", {
    Genero: "Comedia",
  });
}

exec();
