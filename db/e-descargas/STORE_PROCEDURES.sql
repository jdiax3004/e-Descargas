-- Roles
GO
CREATE OR ALTER PROC dbo.InsertarRol
  @Rol NVARCHAR(255)
AS
	INSERT INTO Roles
  VALUES (@Rol);
  SELECT * FROM Roles WHERE Id = SCOPE_IDENTITY();
GO

-- Usuarios
GO
CREATE OR ALTER PROC dbo.InsertarUsuario
  @Id_Rol AS INT,
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
  VALUES (@Id_Rol, @Usuario, @Nombre, @Primer_Apellido, @Segundo_Apellido, @Correo, @Contrasenna, @Pregunta_Seguridad, @Respuesta_Seguridad);
  SELECT * FROM Usuarios WHERE Id = SCOPE_IDENTITY();
GO



-- Musica
GO
CREATE OR ALTER PROC dbo.ObtenerMusica
  @Codigo AS NVARCHAR(255) = NULL
AS
  IF @Codigo IS NULL
  BEGIN
    SELECT * FROM Musica;
  END
  ELSE
  BEGIN
    SELECT * 
    FROM Musica 
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
  VALUES (@Codigo, @Id_Genero, @Id_Idioma, @Nombre, @Anno, @Tipo_Interpretacion, @Pais, @Disquera, @Disco, @Compositor, @Archivo_Descarga, @Archivo_Previsualizacion);
  SELECT * FROM Musica WHERE Codigo = @Codigo;
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
    SELECT * FROM Musica WHERE Codigo = @Codigo;
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

-- Libros

GO
CREATE OR ALTER PROC dbo.ObtenerLibro
  @Codigo AS NVARCHAR(255) = NULL
AS
  IF @Codigo IS NULL
  BEGIN
    SELECT * FROM Libros;
  END
  ELSE
  BEGIN
    SELECT * 
    FROM Libros 
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
  VALUES (@Codigo, @Id_Genero, @Id_Idioma, @Nombre, @Anno, @Autores, @Editorial, @Archivo_Descarga, @Archivo_Previsualizacion);
  SELECT * FROM Libros WHERE Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.ModificarLibro
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
	UPDATE Libros
    SET 
        Id_Genero = @Id_Genero, 
        Id_Idioma = @Id_Idioma, 
        Nombre = @Nombre, 
        Anno = @Anno, 
        Autores = @Autores,
        Editorial = @Editorial,
        Archivo_Descarga = @Archivo_Descarga, 
        Archivo_Previsualizacion = @Archivo_Previsualizacion
    WHERE Codigo = @Codigo;
    SELECT * FROM Libros WHERE Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.EliminarLibro
  @Codigo AS NVARCHAR(255)
AS
    DELETE FROM Libros 
    WHERE 
      Codigo = @Codigo;
GO



-- Errores
GO
CREATE OR ALTER PROC dbo.InsertarError
  @Mensaje AS NVARCHAR(255),
  @Descripcion AS NVARCHAR(255),
  @Codigo_Error AS NVARCHAR(255),
  @Fecha AS NVARCHAR(255)
AS
	INSERT INTO Errores
  VALUES (@Mensaje, @Descripcion, @Codigo_Error, @Fecha);
GO


-- Bitacora 

GO
CREATE OR ALTER PROC dbo.InsertarBitacora
  @Id_Usuario AS INT,
  @Codigo_Registro AS NVARCHAR(255),
  @Tipo AS NVARCHAR(255),
  @Descripcion AS NVARCHAR(255),
  @Detalle_Registro AS NVARCHAR(255),
  @Fecha NVARCHAR(255)
AS
	INSERT INTO Bitacora
  VALUES (@Id_Usuario, @Codigo_Registro, @Tipo, @Descripcion, @Detalle_Registro, @Fecha);
GO

-- Consecutivos
GO
CREATE OR ALTER PROC dbo.ObtenerConsecutivo
  @Id AS INT = NULL
AS
  IF @Id IS NULL
  BEGIN
    SELECT * FROM Consecutivos;
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
  VALUES (@Descripcion, @Consecutivo, @Posee_Prefijo, @Prefijo, @Rango_Inicio, @Rango_Final);
  SELECT * FROM Consecutivos WHERE Id = SCOPE_IDENTITY();
GO

GO
CREATE OR ALTER PROC dbo.ModificarConsecutivo
  @Id AS INT,
  @Descripcion AS INT = null,
  @Consecutivo AS INT = null,
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
    SELECT * FROM Consecutivos WHERE Id = @Id;
END
GO