USE e-Descargas;

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
GO