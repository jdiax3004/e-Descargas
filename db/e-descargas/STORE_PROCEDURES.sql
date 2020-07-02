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


-- Errores
GO
CREATE OR ALTER PROC dbo.InsertarError
  @Mensaje AS NVARCHAR(50),
  @Descripcion AS NTEXT,
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
  @Detalle_Registro AS NTEXT
AS
	INSERT INTO Bitacora
  VALUES (@Id_Usuario, @Codigo_Registro, @Tipo, @Descripcion, @Detalle_Registro, GETDATE());
GO