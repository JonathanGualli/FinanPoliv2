UPDATE [dbo].[Cuenta]
SET 
    [numero_cuenta] = @numero_cuenta
    ,[tipo_cuenta] = @tipo_cuenta
    ,[fecha_creacion] = @fecha_creacion
    ,[saldo] = @saldo
    ,[intereses] = @intereses
    ,[liminte] = @liminte
    ,[estado] = @estado
WHERE [numero_cuenta]=@numero_cuenta

SELECT 
    [numero_cuenta]
    ,[tipo_cuenta]
    ,[fecha_creacion]
    ,[saldo]
    ,[intereses]
    ,[liminte]
    ,[estado]
FROM [dbo].[Cuenta]
WHERE [numero_cuenta]=@numero_cuenta