SELECT [numero_cuenta]
    ,[tipo_cuenta]
    ,[fecha_creacion]
    ,[saldo]
    ,[intereses]
    ,[liminte]
    ,[estado]
FROM [dbo].[Cuenta]
WHERE [numero_cuenta]=@numero_cuenta