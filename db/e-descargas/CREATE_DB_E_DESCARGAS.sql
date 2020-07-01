USE MASTER;

-- CREACION BASE DE DATOS

CREATE DATABASE e-Descargas;
GO

USE e-Descargas;


GO
-- CREACION DE TABLAS

CREATE TABLE Roles (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Rol NVARCHAR(50) NOT NULL,
);


CREATE TABLE Usuarios (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Id_Rol INT NULL FOREIGN KEY REFERENCES Roles(Id),
    Usuario NVARCHAR(50) NOT NULL UNIQUE,
    Nombre NVARCHAR(50) NULL,
	Primer_Apellido NVARCHAR(50) NULL,
	Segundo_Apellido NVARCHAR(50) NULL,
    Correo NVARCHAR(50) NOT NULL,
	Contrasenna NVARCHAR(500) NOT NULL,
	Pregunta_Seguridad NVARCHAR(255) NOT NULL,
	Respuesta_Seguridad NVARCHAR(255) NOT NULL
);

CREATE TABLE Idiomas (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Idioma NVARCHAR(50) NOT NULL,
);

CREATE TABLE Generos_Peliculas (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Genero NVARCHAR(50) NOT NULL,
);

CREATE TABLE Peliculas (
    Codigo NVARCHAR(50) NOT NULL PRIMARY KEY,
    Id_Genero INT NOT NULL FOREIGN KEY REFERENCES Generos_Peliculas(Id),
	Id_Idioma INT NOT NULL FOREIGN KEY REFERENCES Idiomas(Id),
    Nombre NVARCHAR(50) NULL,
	Anno INT NULL,
	Actores NVARCHAR(255) NULL,
	Archivo_Descarga NVARCHAR(255) NOT NULL,
    Archivo_Previsualizacion NVARCHAR(255) NOT NULL
);

CREATE TABLE Generos_Libros (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Genero NVARCHAR(50) NOT NULL,
);

CREATE TABLE Libros (
    Codigo NVARCHAR(50) NOT NULL PRIMARY KEY,
    Id_Genero INT NULL FOREIGN KEY REFERENCES Generos_Libros(Id),
	Id_Idioma INT NULL FOREIGN KEY REFERENCES Idiomas(Id),
    Nombre NVARCHAR(50) NULL,
	Anno INT NULL,
	Autores NVARCHAR(255) NULL,
	Editorial NVARCHAR(100) NULL,
	Archivo_Descarga NVARCHAR(255) NOT NULL,
    Archivo_Previsualizacion NVARCHAR(255) NOT NULL
);

CREATE TABLE Generos_Musica (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Genero NVARCHAR(50) NOT NULL,
);

CREATE TABLE Musica (
    Codigo NVARCHAR(50) NOT NULL PRIMARY KEY,
    Id_Genero INT NULL FOREIGN KEY REFERENCES Generos_Musica(Id),
	Id_Idioma INT NULL FOREIGN KEY REFERENCES Idiomas(Id),
    Nombre NVARCHAR(50) NULL,
	Anno INT NULL,
	Tipo_Interpretacion NVARCHAR(50) NULL,
	Pais NVARCHAR(50) NULL,
	Disquera NVARCHAR(50) NULL,
	Disco NVARCHAR(50) NULL,
	Compositor NVARCHAR(50) NULL,
	Archivo_Descarga NVARCHAR(255) NOT NULL,
    Archivo_Previsualizacion NVARCHAR(255) NOT NULL
);

CREATE TABLE Bitacora (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Id_Usuario INT NULL FOREIGN KEY REFERENCES Usuarios(Id),
	Codigo_Registro NVARCHAR(50) NOT NULL,
	Tipo NVARCHAR(50) NOT NULL,
	Descripcion NVARCHAR(500) NOT NULL,
	Detalle_Registro NTEXT NOT NULL,
	Fecha DATETIME DEFAULT GETDATE()

);

CREATE TABLE Transacciones (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
	Tipo_Pago NVARCHAR(50) NOT NULL,
    Monto DECIMAL NOT NULL,
	Fecha DATETIME DEFAULT GETDATE()
);

CREATE TABLE Descargas (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
	Genero NVARCHAR(50) NOT NULL,
    Tipo NVARCHAR(50) NOT NULL,
	Codigo_Referencia NVARCHAR(50) NOT NULL,
	Fecha DATETIME DEFAULT GETDATE()
);

CREATE TABLE Errores (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
	Mensaje NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(500) NOT NULL,
	Codigo_Error NVARCHAR(30) NOT NULL DEFAULT -1,
	Fecha DATETIME DEFAULT GETDATE()
);

CREATE TABLE Tarjetas (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
	Id_Usuario INT NOT NULL FOREIGN KEY REFERENCES Usuarios(Id),
    Numero NVARCHAR(100) NOT NULL UNIQUE,
    CVV INT NOT NULL,
    Tipo NVARCHAR(20) NOT NULL,
    Mes_Expiracion NUMERIC(18,0) NOT NULL,
	Anno_Expiracion NUMERIC(18,0) NOT NULL,
);

CREATE TABLE EasyPay (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Id_Usuario INT NOT NULL FOREIGN KEY REFERENCES Usuarios(Id),
    Numero_Cuenta INT NOT NULL,
	Codigo_Seguridad INT NOT NULL,
	Contrasenna NVARCHAR(500)  NULL
);

CREATE TABLE Parametros (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Codigo NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(255)  NULL,
    Valor NVARCHAR(1000) NOT NULL
);

CREATE TABLE Consecutivos (
    Id INT IDENTITY NOT NULL PRIMARY KEY,
    Descripcion NVARCHAR(255) NULL,
	Consecutivo NVARCHAR(255)  NOT NULL,
	Posee_Prefijo BIT NOT NULL,
	Prefijo NVARCHAR(255) NULL,
	Rango_Inicio INT NOT NULL,
	Rango_Final INT NOT NULL
);

