USE MASTER;

-- CREACION BASE DE DATOS

CREATE DATABASE Pagos;
GO

USE Pagos;
GO

-- CREACION DE TABLAS

CREATE TABLE Tarjetas (
    Id INT IDENTITY NOT NULL,
    Numero NVARCHAR(100) NOT NULL UNIQUE,
    CVV NVARCHAR(10) NOT NULL,
    Tipo NVARCHAR(20) NOT NULL,
    Mes_Expiracion NUMERIC(18,0) NOT NULL,
	Anno_Expiracion NUMERIC(18,0) NOT NULL,
	Fondos NUMERIC(18,2) NULL,
	Limite NUMERIC(18,2) NULL
);

CREATE TABLE Easypay (
    Id INT IDENTITY NOT NULL,
    Numero_Cuenta NVARCHAR(100) NOT NULL UNIQUE,
    Codigo_Seguridad NVARCHAR(30) NOT NULL,
    Contrasenna NVARCHAR(20) NOT NULL,
	Fondos NUMERIC(18,2) NULL
);
GO

-- CREACION DE SP

CREATE OR ALTER PROC dbo.ObtenerTarjeta
  @Numero AS NVARCHAR(100)
AS
	SELECT T.Numero,
		   T.CVV,
		   T.Mes_Expiracion,
		   T.Anno_Expiracion,
		   T.Tipo,
		   T.Fondos,
		   T.Limite
	FROM dbo.Tarjetas AS T
	WHERE T.Numero = @Numero;
GO

CREATE OR ALTER PROC dbo.ObtenerCuentaEasyPay
  @Numero AS NVARCHAR(100)
AS
	SELECT EP.Numero_Cuenta,
	   EP.Codigo_Seguridad,
	   EP.Contrasenna,
	   EP.Fondos
FROM dbo.EasyPay AS EP
WHERE EP.Numero_Cuenta = @Numero;
GO

CREATE OR ALTER PROC dbo.DescontarSaldoCuentaEasyPay
  @Numero AS NVARCHAR(100),
  @Monto AS NUMERIC(18,2)
AS
	UPDATE dbo.Easypay
	SET Fondos -= @Monto
	WHERE Numero_Cuenta = @Numero;
	RETURN 1
GO

CREATE OR ALTER PROC dbo.DescontarSaldoTarjeta
  @Numero AS NVARCHAR(100),
  @Monto AS NUMERIC(18,2),
  @EsDebito AS INT = 1
AS

	IF @EsDebito = 1
		UPDATE dbo.Tarjetas
		SET Fondos -= @Monto
		WHERE Numero = @Numero;
	ELSE
		UPDATE dbo.Tarjetas
		SET Limite -= @Monto
		WHERE Numero = @Numero;
	
	RETURN 1
GO

-- PRUEBAS DE SP

EXEC dbo.ObtenerTarjeta @Numero = 'LU63 323E LZVK 6TYV ZKFQ'

EXEC dbo.ObtenerCuentaEasyPay @Numero = 4911163511712886087

EXEC dbo.DescontarSaldoCuentaEasyPay @Numero = 4911163511712886087, @Monto = 500

EXEC dbo.DescontarSaldoTarjeta @Numero = 'BE77 8173 0898 3059', @Monto = 100000