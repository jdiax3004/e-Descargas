-- Roles
GO
CREATE OR ALTER PROC dbo.InsertarRol
  @Rol NVARCHAR(50)
AS
	INSERT INTO Roles
  VALUES (@Rol);
  SELECT * FROM Roles WHERE Id = SCOPE_IDENTITY();
GO

-- Usuarios
GO
CREATE OR ALTER PROC dbo.InsertarUsuario
  @Id_Rol AS INT,
  @Usuario AS NVARCHAR(50),
  @Nombre AS NVARCHAR(50),
  @Primer_Apellido AS NVARCHAR(50),
  @Segundo_Apellido AS NVARCHAR(50),
  @Correo AS NVARCHAR(50),
  @Contrasenna AS NVARCHAR(500),
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
  @Codigo AS NVARCHAR(50) = NULL
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
  @Codigo AS NVARCHAR(50),
  @Id_Genero AS INT,
  @Id_Idioma AS INT,
  @Nombre AS NVARCHAR(50),
  @Anno AS INT,
  @Tipo_Interpretacion AS NVARCHAR(50),
  @Pais AS NVARCHAR(50),
  @Disquera AS NVARCHAR(50),
  @Disco AS NVARCHAR(50),
  @Compositor AS NVARCHAR(50),
  @Archivo_Descarga AS NVARCHAR(255),
  @Archivo_Previsualizacion AS NVARCHAR(255)
AS
	INSERT INTO Musica
  VALUES (@Codigo, @Id_Genero, @Id_Idioma, @Nombre, @Anno, @Tipo_Interpretacion, @Pais, @Disquera, @Disco, @Compositor, @Archivo_Descarga, @Archivo_Previsualizacion);
  SELECT * FROM Musica WHERE Codigo = @Codigo;
GO
GO
EXEC sp_refresh_parameter_encryption 'dbo.InsertarMusica'
GO

GO
CREATE OR ALTER PROC dbo.ModificarMusica
  @Codigo AS NVARCHAR(50),
  @Id_Genero AS INT,
  @Id_Idioma AS INT,
  @Nombre AS NVARCHAR(50),
  @Anno AS INT,
  @Tipo_Interpretacion AS NVARCHAR(50),
  @Pais AS NVARCHAR(50),
  @Disquera AS NVARCHAR(50),
  @Disco AS NVARCHAR(50),
  @Compositor AS NVARCHAR(50),
  @Archivo_Descarga AS NVARCHAR(255),
  @Archivo_Previsualizacion AS NVARCHAR(255)
AS
	UPDATE Musica
    SET 
        Id_Genero = @Id_Genero, 
        Id_Idioma = @Id_Idioma, 
        Nombre = @Nombre, 
        Anno = @Anno, 
        Tipo_Interpretacion = @Tipo_Interpretacion, 
        Pais = @Pais, 
        Disquera = @Disquera, 
        Disco = @Disco, 
        Compositor = @Compositor, 
        Archivo_Descarga = @Archivo_Descarga, 
        Archivo_Previsualizacion = @Archivo_Previsualizacion
    WHERE Codigo = @Codigo;
    SELECT * FROM Musica WHERE Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.EliminarMusica
  @Codigo AS NVARCHAR(50)
AS
    DELETE FROM Musica 
    WHERE 
      Codigo = @Codigo;
GO

-- Libros

GO
CREATE OR ALTER PROC dbo.ObtenerLibro
  @Codigo AS NVARCHAR(50) = NULL
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
  @Codigo AS NVARCHAR(50),
  @Id_Genero AS INT,
  @Id_Idioma AS INT,
  @Nombre AS NVARCHAR(50),
  @Anno AS INT,
  @Autores AS NVARCHAR(255),
  @Editorial AS NVARCHAR(100),
  @Archivo_Descarga AS NVARCHAR(255),
  @Archivo_Previsualizacion AS NVARCHAR(255)
AS
	INSERT INTO Libros
  VALUES (@Codigo, @Id_Genero, @Id_Idioma, @Nombre, @Anno, @Autores, @Editorial, @Archivo_Descarga, @Archivo_Previsualizacion);
  SELECT * FROM Libros WHERE Codigo = @Codigo;
GO

GO
CREATE OR ALTER PROC dbo.ModificarLibro
  @Codigo AS NVARCHAR(50),
  @Id_Genero AS INT,
  @Id_Idioma AS INT,
  @Nombre AS NVARCHAR(50),
  @Anno AS INT,
  @Autores AS NVARCHAR(255),
  @Editorial AS NVARCHAR(100),
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
  @Codigo AS NVARCHAR(50)
AS
    DELETE FROM Libros 
    WHERE 
      Codigo = @Codigo;
GO



-- Errores
GO
CREATE OR ALTER PROC dbo.InsertarError
  @Mensaje AS NVARCHAR(50),
  @Descripcion AS NVARCHAR(1000),
  @Codigo_Error AS NVARCHAR(30)
AS
	INSERT INTO Errores
  VALUES (@Mensaje, @Descripcion, @Codigo_Error, GETDATE());
GO


-- Bitacora 
GO
CREATE OR ALTER PROC dbo.InsertarBitacora
  @Id_Usuario AS INT,
  @Codigo_Registro AS NVARCHAR(50),
  @Tipo AS NVARCHAR(50),
  @Descripcion AS NVARCHAR(500),
  @Detalle_Registro AS NVARCHAR(1000)
AS
	INSERT INTO Bitacora
  VALUES (@Id_Usuario, @Codigo_Registro, @Tipo, @Descripcion, @Detalle_Registro, GETDATE());
GO

