GO
CREATE OR ALTER PROC dbo.InsertarRol
  @Rol NVARCHAR(255)
AS
INSERT INTO Roles
VALUES
  (@Rol);
SELECT *
FROM Roles
WHERE Id = SCOPE_IDENTITY();
GO

GO
CREATE OR ALTER PROC dbo.ObtenerRol
  @Id AS INT = NULL
AS
IF @Id IS NULL
  BEGIN
  SELECT *
  FROM Roles;
END
  ELSE
  BEGIN
  SELECT *
  FROM Roles
  WHERE Id = @Id;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarRolUsuario
  @Id_Rol INT,
  @Codigo_Usuario NVARCHAR(255)
AS
INSERT INTO Roles_Usuarios
VALUES
  (@Id_Rol, @Codigo_Usuario);
SELECT *
FROM Roles_Usuarios
WHERE Id_Rol = @Id_Rol
  AND Codigo_Usuario = @Codigo_Usuario;
GO

GO
CREATE OR ALTER PROC dbo.ObtenerRolUsuario
  @Codigo_Usuario NVARCHAR(255)
AS
IF @Codigo_Usuario IS NULL
  BEGIN
  SELECT *
  FROM Roles_Usuarios;
END
  ELSE
  BEGIN
  SELECT *
  FROM Roles_Usuarios
  WHERE Codigo_Usuario = @Codigo_Usuario;
END
GO

GO
CREATE OR ALTER PROC dbo.ObtenerRolUsuarioArray
  @Codigo_Usuario NVARCHAR(255)
AS
DECLARE @result VARCHAR(500)
SET @result = '['
SELECT @result = @result + CAST(Id_Rol AS VARCHAR(10)) + ', ' 
FROM Roles_Usuarios
WHERE Codigo_Usuario = @Codigo_Usuario;

SELECT LEFT(@result,LEN(@result)-1) + ']' AS Id_Roles
GO

GO
CREATE OR ALTER PROC dbo.EliminarRolUsuario
  @Codigo_Usuario NVARCHAR(255)
AS
DELETE 
FROM Roles_Usuarios
WHERE Codigo_Usuario = @Codigo_Usuario;
GO

GO
CREATE OR ALTER PROC dbo.InsertarIdioma
  @Idioma NVARCHAR(255)
AS
INSERT INTO Idiomas
VALUES
  (@Idioma);
SELECT *
FROM Idiomas
WHERE Id = SCOPE_IDENTITY();
GO

GO
CREATE OR ALTER PROC dbo.ObtenerIdioma
  @Id AS INT = NULL
AS
IF @Id IS NULL
  BEGIN
  SELECT *
  FROM Idiomas;
END
  ELSE
  BEGIN
  SELECT *
  FROM Idiomas
  WHERE Id = @Id;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarGeneroMusica
  @Genero NVARCHAR(255)
AS
INSERT INTO Generos_Musica
VALUES
  (@Genero);
SELECT *
FROM Generos_Musica
WHERE Id = SCOPE_IDENTITY();
GO

GO
CREATE OR ALTER PROC dbo.ObtenerGeneroMusica
  @Id AS INT = NULL
AS
IF @Id IS NULL
  BEGIN
  SELECT *
  FROM Generos_Musica;
END
  ELSE
  BEGIN
  SELECT *
  FROM Generos_Musica
  WHERE Id = @Id;
END
GO


GO
CREATE OR ALTER PROC dbo.InsertarGeneroLibros
  @Genero NVARCHAR(255)
AS
INSERT INTO Generos_Libros
VALUES
  (@Genero);
SELECT *
FROM Generos_Libros
WHERE Id = SCOPE_IDENTITY();
GO

GO
CREATE OR ALTER PROC dbo.ObtenerGeneroLibro
  @Id AS INT = NULL
AS
IF @Id IS NULL
  BEGIN
  SELECT *
  FROM Generos_Libros;
END
  ELSE
  BEGIN
  SELECT *
  FROM Generos_Libros
  WHERE Id = @Id;
END
GO


GO
CREATE OR ALTER PROC dbo.InsertarGeneroPeliculas
  @Genero NVARCHAR(255)
AS
INSERT INTO Generos_Peliculas
VALUES
  (@Genero);
SELECT *
FROM Generos_Peliculas
WHERE Id = SCOPE_IDENTITY();
GO

GO
CREATE OR ALTER PROC dbo.ObtenerGeneroPeliculas
  @Id AS INT = NULL
AS
IF @Id IS NULL
  BEGIN
  SELECT *
  FROM Generos_Peliculas;
END
  ELSE
  BEGIN
  SELECT *
  FROM Generos_Peliculas
  WHERE Id = @Id;
END
GO

GO
CREATE OR ALTER PROC dbo.ObtenerUsuario
  @Codigo AS NVARCHAR(255) = NULL
AS
IF @Codigo IS NULL
  BEGIN
  SELECT *
  FROM Usuarios;
END
  ELSE
  BEGIN
  SELECT *
  FROM Usuarios
  WHERE Codigo = @Codigo;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarUsuario
  @Codigo AS NVARCHAR(255),
  @Usuario AS NVARCHAR(255),
  @Nombre AS NVARCHAR(255),
  @Primer_Apellido AS NVARCHAR(255),
  @Segundo_Apellido AS NVARCHAR(255),
  @Correo AS NVARCHAR(255),
  @Contrasenna AS NVARCHAR(255),
  @Pregunta_Seguridad AS NVARCHAR(255),
  @Respuesta_Seguridad AS NVARCHAR(255)
AS
INSERT INTO Usuarios
VALUES
  (@Codigo, @Usuario, @Nombre, @Primer_Apellido, @Segundo_Apellido, @Correo, @Contrasenna, @Pregunta_Seguridad, @Respuesta_Seguridad);
SELECT *
FROM Usuarios
WHERE Codigo = @Codigo;
GO


GO
CREATE OR ALTER PROC dbo.ModificarUsuario
  @Codigo AS NVARCHAR(255),
  @Usuario AS NVARCHAR(255)= null,
  @Nombre AS NVARCHAR(255)= null,
  @Primer_Apellido AS NVARCHAR(255)= null,
  @Segundo_Apellido AS NVARCHAR(255)= null,
  @Correo AS NVARCHAR(255)= null,
  @Contrasenna AS NVARCHAR(255)= null,
  @Pregunta_Seguridad AS NVARCHAR(255)= null,
  @Respuesta_Seguridad AS NVARCHAR(255)= null
AS
BEGIN
  SET NOCOUNT ON

  UPDATE Usuarios
    SET 
        Usuario = isNull(@Usuario,Usuario), 
        Nombre = isNull(@Nombre, Nombre),
        Primer_Apellido = isNull(@Primer_Apellido, Primer_Apellido),
        Segundo_Apellido = isNull(@Segundo_Apellido, Segundo_Apellido),
        Correo = isNull(@Correo, Correo),
        Contrasenna = isNull(@Contrasenna, Contrasenna),
        Pregunta_Seguridad = isNull(@Pregunta_Seguridad, Pregunta_Seguridad),
        Respuesta_Seguridad = isNull(@Respuesta_Seguridad, Respuesta_Seguridad)
    WHERE Codigo = @Codigo;
  SELECT *
  FROM Usuarios
  WHERE Codigo = @Codigo;
END
GO

GO
CREATE OR ALTER PROC dbo.EliminarUsuario
  @Codigo AS NVARCHAR(255)
AS
DELETE FROM Usuarios 
    WHERE 
      Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.ObtenerMusica
  @Codigo AS NVARCHAR(255) = NULL
AS
IF @Codigo IS NULL
  BEGIN
  SELECT Musica.*,
	  Genero.Genero,
	  Idioma.Idioma
  FROM Musica
    INNER JOIN Generos_Musica AS Genero ON Genero.Id = Id_Genero
    INNER JOIN Idiomas AS Idioma ON Idioma.Id = Id_Idioma;
END
  ELSE
  BEGIN
  SELECT Musica.*,
	  Genero.Genero,
	  Idioma.Idioma
  FROM Musica
    INNER JOIN Generos_Musica AS Genero ON Genero.Id = Id_Genero
    INNER JOIN Idiomas AS Idioma ON Idioma.Id = Id_Idioma
  WHERE Codigo = @Codigo;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarMusica
  @Codigo AS NVARCHAR(255),
  @Id_Genero AS INT,
  @Id_Idioma AS INT,
  @Nombre AS NVARCHAR(255),
  @Anno AS NVARCHAR(255),
  @Tipo_Interpretacion AS NVARCHAR(255),
  @Pais AS NVARCHAR(255),
  @Disquera AS NVARCHAR(255),
  @Disco AS NVARCHAR(255),
  @Compositor AS NVARCHAR(255),
  @Archivo_Descarga AS NVARCHAR(255),
  @Archivo_Previsualizacion AS NVARCHAR(255)
AS
INSERT INTO Musica
VALUES
  (@Codigo, @Id_Genero, @Id_Idioma, @Nombre, @Anno, @Tipo_Interpretacion, @Pais, @Disquera, @Disco, @Compositor, @Archivo_Descarga, @Archivo_Previsualizacion);
EXEC dbo.ObtenerMusica @Codigo = @Codigo;
GO


GO
CREATE OR ALTER PROC dbo.ModificarMusica
  @Codigo AS NVARCHAR(255) ,
  @Id_Genero AS INT = null,
  @Id_Idioma AS INT = null,
  @Nombre AS NVARCHAR(255) = null,
  @Anno AS NVARCHAR(255) = null,
  @Tipo_Interpretacion AS NVARCHAR(255) = null,
  @Pais AS NVARCHAR(255) = null,
  @Disquera AS NVARCHAR(255) = null,
  @Disco AS NVARCHAR(255) = null,
  @Compositor AS NVARCHAR(255) = null,
  @Archivo_Descarga AS NVARCHAR(255) = null,
  @Archivo_Previsualizacion AS NVARCHAR(255) = null

AS
BEGIN
  SET NOCOUNT ON

  UPDATE Musica
    SET 
        Id_Genero = isNull(@Id_Genero,Id_Genero), 
        Id_Idioma = isNull(@Id_Idioma,Id_Idioma), 
        Nombre = isNull(@Nombre, Nombre),
        Anno = isNull(@Anno, Anno),
        Tipo_Interpretacion = isNull(@Tipo_Interpretacion, Tipo_Interpretacion),
        Pais = isNull(@Pais, Pais),
        Disquera = isNull(@Disquera, Disquera),
        Disco = isNull(@Disco, Disco),
        Compositor = isNull(@Compositor, Compositor),
        Archivo_Descarga = isNull(@Archivo_Descarga, Archivo_Descarga),
        Archivo_Previsualizacion = isNull(@Archivo_Previsualizacion,Archivo_Previsualizacion)
    WHERE Codigo = @Codigo;
  EXEC dbo.ObtenerMusica @Codigo = @Codigo;
END
GO

GO
CREATE OR ALTER PROC dbo.EliminarMusica
  @Codigo AS NVARCHAR(255)
AS
DELETE FROM Musica 
    WHERE 
      Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.ObtenerLibro
  @Codigo AS NVARCHAR(255) = NULL
AS
IF @Codigo IS NULL
  BEGIN
  SELECT Libros.*,
	  Genero.Genero,
	  Idioma.Idioma
  FROM Libros
    INNER JOIN Generos_Libros AS Genero ON Genero.Id = Id_Genero
    INNER JOIN Idiomas AS Idioma ON Idioma.Id = Id_Idioma;
END
  ELSE
  BEGIN
  SELECT Libros.*,
	  Genero.Genero,
	  Idioma.Idioma
  FROM Libros
    INNER JOIN Generos_Libros AS Genero ON Genero.Id = Id_Genero
    INNER JOIN Idiomas AS Idioma ON Idioma.Id = Id_Idioma
  WHERE Codigo = @Codigo;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarLibro
  @Codigo AS NVARCHAR(255),
  @Id_Genero AS INT,
  @Id_Idioma AS INT,
  @Nombre AS NVARCHAR(255),
  @Anno AS NVARCHAR(255),
  @Autores AS NVARCHAR(255),
  @Editorial AS NVARCHAR(255),
  @Archivo_Descarga AS NVARCHAR(255),
  @Archivo_Previsualizacion AS NVARCHAR(255)
AS
INSERT INTO Libros
VALUES
  (@Codigo, @Id_Genero, @Id_Idioma, @Nombre, @Anno, @Autores, @Editorial, @Archivo_Descarga, @Archivo_Previsualizacion);
EXEC dbo.ObtenerLibro @Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.ModificarLibro
  @Codigo AS NVARCHAR(255),
  @Id_Genero AS INT= null,
  @Id_Idioma AS INT= null,
  @Nombre AS NVARCHAR(255)= null,
  @Anno AS NVARCHAR(255)= null,
  @Autores AS NVARCHAR(255)= null,
  @Editorial AS NVARCHAR(255)= null,
  @Archivo_Descarga AS NVARCHAR(255)= null,
  @Archivo_Previsualizacion AS NVARCHAR(255)= null

AS
BEGIN
  SET NOCOUNT ON

  UPDATE Libros
    SET 
        Id_Genero = isNull(@Id_Genero,Id_Genero), 
        Id_Idioma = isNull(@Id_Idioma,Id_Idioma), 
        Nombre = isNull(@Nombre, Nombre),
        Anno = isNull(@Anno, Anno),
        Autores = isNull(@Autores, Autores),
        Editorial = isNull(@Editorial, Editorial),
        Archivo_Descarga = isNull(@Archivo_Descarga, Archivo_Descarga),
        Archivo_Previsualizacion = isNull(@Archivo_Previsualizacion,Archivo_Previsualizacion)
    WHERE Codigo = @Codigo;
EXEC dbo.ObtenerLibro @Codigo = @Codigo;
END
GO

GO
CREATE OR ALTER PROC dbo.EliminarLibro
  @Codigo AS NVARCHAR(255)
AS
DELETE FROM Libros 
    WHERE 
      Codigo = @Codigo;
GO


GO
CREATE OR ALTER PROC dbo.ObtenerPeliculas
  @Codigo AS NVARCHAR(255) = NULL
AS
IF @Codigo IS NULL
  BEGIN
  SELECT Peliculas.*,
	  Genero.Genero,
	  Idioma.Idioma
  FROM Peliculas
    INNER JOIN Generos_Peliculas AS Genero ON Genero.Id = Id_Genero
    INNER JOIN Idiomas AS Idioma ON Idioma.Id = Id_Idioma;
END
  ELSE
  BEGIN
   SELECT Peliculas.*,
	  Genero.Genero,
	  Idioma.Idioma
  FROM Peliculas
    INNER JOIN Generos_Peliculas AS Genero ON Genero.Id = Id_Genero
    INNER JOIN Idiomas AS Idioma ON Idioma.Id = Id_Idioma
  WHERE Codigo = @Codigo;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarPeliculas
  @Codigo AS NVARCHAR(255),
  @Id_Genero AS INT,
  @Id_Idioma AS INT,
  @Nombre AS NVARCHAR(255),
  @Anno AS NVARCHAR(255),
  @Actores AS NVARCHAR(255),
  @Archivo_Descarga AS NVARCHAR(255),
  @Archivo_Previsualizacion AS NVARCHAR(255)
AS
INSERT INTO Peliculas
VALUES
  (@Codigo, @Id_Genero, @Id_Idioma, @Nombre, @Anno, @Actores, @Archivo_Descarga, @Archivo_Previsualizacion);
EXEC dbo.ObtenerPeliculas @Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.ModificarPeliculas
  @Codigo AS NVARCHAR(255),
  @Id_Genero AS INT= null,
  @Id_Idioma AS INT= null,
  @Nombre AS NVARCHAR(255)= null,
  @Anno AS NVARCHAR(255)= null,
  @Actores AS NVARCHAR(255)= null,
  @Archivo_Descarga AS NVARCHAR(255)= null,
  @Archivo_Previsualizacion AS NVARCHAR(255)= null
AS
BEGIN
  SET NOCOUNT ON

  UPDATE Peliculas
    SET 
        Id_Genero = isNull(@Id_Genero,Id_Genero), 
        Id_Idioma = isNull(@Id_Idioma,Id_Idioma), 
        Nombre = isNull(@Nombre, Nombre),
        Anno = isNull(@Anno, Anno),
        Actores = isNull(@Actores, Actores),
        Archivo_Descarga = isNull(@Archivo_Descarga, Archivo_Descarga),
        Archivo_Previsualizacion = isNull(@Archivo_Previsualizacion,Archivo_Previsualizacion)
    WHERE Codigo = @Codigo;
  EXEC dbo.ObtenerPeliculas @Codigo = @Codigo;
END
GO


GO
CREATE OR ALTER PROC dbo.EliminarPeliculas
  @Codigo AS NVARCHAR(255)
AS
DELETE FROM Peliculas 
    WHERE 
      Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.InsertarError
  @Mensaje AS NVARCHAR(255),
  @Descripcion AS NVARCHAR(255),
  @Codigo_Error AS NVARCHAR(255),
  @Fecha AS NVARCHAR(255)
AS
INSERT INTO Errores
VALUES
  (@Mensaje, @Descripcion, @Codigo_Error, @Fecha);
GO


-- Bitacora 

GO
CREATE OR ALTER PROC dbo.InsertarBitacora
  @Codigo_Usuario AS NVARCHAR(255),
  @Codigo_Registro AS NVARCHAR(255),
  @Tipo AS NVARCHAR(255),
  @Descripcion AS NVARCHAR(255),
  @Detalle_Registro AS NVARCHAR(255),
  @Fecha NVARCHAR(255)
AS
INSERT INTO Bitacora
VALUES
  (@Codigo_Usuario, @Codigo_Registro, @Tipo, @Descripcion, @Detalle_Registro, @Fecha);
GO

GO
CREATE OR ALTER PROC dbo.ObtenerConsecutivo
  @Id AS INT = NULL
AS
IF @Id IS NULL
  BEGIN
  SELECT *
  FROM Consecutivos;
END
  ELSE
  BEGIN
  SELECT *
  FROM Consecutivos
  WHERE Id = @Id;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarConsecutivo
  @Descripcion AS NVARCHAR(255),
  @Consecutivo AS NVARCHAR(255),
  @Posee_Prefijo AS NVARCHAR(255),
  @Prefijo AS NVARCHAR(255),
  @Rango_Inicio NVARCHAR(255),
  @Rango_Final NVARCHAR(255)
AS
INSERT INTO Consecutivos
VALUES
  (@Descripcion, @Consecutivo, @Posee_Prefijo, @Prefijo, @Rango_Inicio, @Rango_Final);
SELECT *
FROM Consecutivos
WHERE Id = SCOPE_IDENTITY();
GO

GO
CREATE OR ALTER PROC dbo.ModificarConsecutivo
  @Id AS INT,
  @Descripcion AS NVARCHAR(255) = null,
  @Consecutivo AS NVARCHAR(255) = null,
  @Posee_Prefijo AS NVARCHAR(255) = null,
  @Prefijo AS NVARCHAR(255) = null,
  @Rango_Inicio AS NVARCHAR(255) = null,
  @Rango_Final AS NVARCHAR(255) = null
AS
BEGIN
  SET NOCOUNT ON
  UPDATE Consecutivos
    SET 
        Descripcion = isNull(@Descripcion,Descripcion), 
        Consecutivo = isNull(@Consecutivo,Consecutivo), 
        Posee_Prefijo = isNull(@Posee_Prefijo, Posee_Prefijo),
        Prefijo = isNull(@Prefijo, Prefijo),
        Rango_Inicio = isNull(@Rango_Inicio, Rango_Inicio),
        Rango_Final = isNull(@Rango_Final, Rango_Final)
    WHERE Id = @Id;
  SELECT *
  FROM Consecutivos
  WHERE Id = @Id;
END
GO

GO
CREATE OR ALTER PROC dbo.EliminarConsecutivo
  @Id AS INT
AS
DELETE FROM Consecutivos 
    WHERE 
      Id = @Id;
GO

GO
CREATE OR ALTER PROC dbo.ObtenerTransaccion
  @Codigo AS NVARCHAR(255) = NULL
AS
IF @Codigo IS NULL
  BEGIN
  SELECT *
  FROM Transacciones;
END
  ELSE
  BEGIN
  SELECT *
  FROM Transacciones
  WHERE Codigo = @Codigo;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarTransaccion
  @Codigo AS NVARCHAR(255),
  @Tipo_Pago AS NVARCHAR(255),
  @Monto AS NVARCHAR(255),
  @Fecha AS NVARCHAR(255)
AS
INSERT INTO Transacciones
VALUES
  (@Codigo, @Tipo_Pago, @Monto, @Fecha);
SELECT *
FROM Transacciones
WHERE Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.ModificarTransaccion
  @Codigo AS NVARCHAR(255),
  @Tipo_Pago AS NVARCHAR(255),
  @Monto AS NVARCHAR(255),
  @Fecha AS NVARCHAR(255)
AS
UPDATE Transacciones
    SET 
        Codigo = @Codigo, 
        Tipo_Pago = @Tipo_Pago, 
        Monto = @Monto, 
        Fecha = @Fecha
    WHERE Codigo = @Codigo;
SELECT *
FROM Transacciones
WHERE Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.EliminarTransaccion
  @Codigo AS NVARCHAR(255)
AS
DELETE FROM Transacciones 
    WHERE 
      Codigo = @Codigo;
GO


GO
CREATE OR ALTER PROC dbo.ObtenerParametros
  @Id AS INT = NULL
AS
IF @Id IS NULL
  BEGIN
  SELECT *
  FROM Parametros;
END
  ELSE
  BEGIN
  SELECT *
  FROM Parametros
  WHERE Id = @Id;
END
GO

GO
CREATE OR ALTER PROC dbo.InsertarParametros
  @Nombre AS NVARCHAR(100),
  @Descripcion NVARCHAR(255),
  @Valor AS NVARCHAR(1000)
AS
INSERT INTO Parametros
VALUES
  (@Nombre,@Descripcion,@Valor);
SELECT *
FROM Parametros
WHERE Id = SCOPE_IDENTITY();
GO


GO
CREATE OR ALTER PROC dbo.ModificarParametros
  @Id AS INT,
  @Nombre AS NVARCHAR(100) = null,
  @Descripcion NVARCHAR(255) = null,
  @Valor AS NVARCHAR(1000) = null
AS
BEGIN
  SET NOCOUNT ON
  UPDATE Parametros
    SET 
        Nombre = isNull(@Nombre,Nombre), 
        Descripcion = isNull(@Descripcion,Descripcion), 
        Valor = isNull(@Valor, Valor)
    WHERE Id = @Id;
  SELECT *
  FROM Parametros
  WHERE Id = @Id;
END
GO

GO
CREATE OR ALTER PROC dbo.EliminarParametros
  @Id AS INT
AS
DELETE FROM Parametros 
    WHERE 
      @Id = @Id;
GO