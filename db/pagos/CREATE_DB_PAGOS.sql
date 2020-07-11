USE MASTER;

DROP DATABASE Pagos

-- CREACION BASE DE DATOS

CREATE DATABASE Pagos;
GO

USE Pagos;
GO

-- CREACION DE TABLAS

DROP TABLE Tarjetas

CREATE TABLE Tarjetas (
    Id INT IDENTITY NOT NULL,
    Numero NUMERIC(20) NOT NULL UNIQUE,
    CVV INT NOT NULL,
    Tipo INT NOT NULL,
    Mes_Expiracion INT NOT NULL,
	Anno_Expiracion INT NOT NULL,
	Fondos NUMERIC(18,2) NULL,
	Limite NUMERIC(18,2) NULL
);

--DROP TABLE Easypay

CREATE TABLE Easypay (
    Id INT IDENTITY NOT NULL,
    Numero_Cuenta NUMERIC(20) NOT NULL UNIQUE,
    Codigo_Seguridad NVARCHAR(30) NOT NULL,
    Contrasenna NVARCHAR(20) NOT NULL,
	Fondos NUMERIC(18,2) NOT NULL
);
GO

-- CREACION DE SP

CREATE OR ALTER PROC dbo.ObtenerTarjeta
  @Numero AS NUMERIC(20)
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
  @Numero AS NUMERIC(20)
AS
	SELECT EP.Numero_Cuenta,
	   EP.Codigo_Seguridad,
	   EP.Contrasenna,
	   EP.Fondos
FROM dbo.EasyPay AS EP
WHERE EP.Numero_Cuenta = @Numero;
GO

CREATE OR ALTER PROC dbo.DescontarSaldoCuentaEasyPay
  @Numero AS NUMERIC(20),
  @Monto AS NUMERIC(18,2)
AS
	UPDATE dbo.Easypay
	SET Fondos -= @Monto
	WHERE Numero_Cuenta = @Numero;
	RETURN 1
GO

CREATE OR ALTER PROC dbo.DescontarSaldoTarjeta
  @Numero AS NUMERIC(20),
  @Monto AS NUMERIC(18,2),
  @EsDebito AS NUMERIC(20) = 1
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

EXEC dbo.ObtenerTarjeta @Numero = 5414977085364642

EXEC dbo.ObtenerCuentaEasyPay @Numero = 5010125758620803

EXEC dbo.DescontarSaldoCuentaEasyPay @Numero = 5010125758620803, @Monto = 500

EXEC dbo.DescontarSaldoTarjeta @Numero = 5414977085364642, @Monto = 100000