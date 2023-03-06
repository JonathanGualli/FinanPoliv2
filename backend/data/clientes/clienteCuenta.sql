SELECT [fecha_vinculacion]
    ,[numero_cedula]
    ,[numero_cuenta]
FROM [dbo].[CuentaCliente]
WHERE [numero_cedula]=@numero_cedula