SELECT [numero_identificacion]
    ,[numero_cuenta]
    ,[nombre_contacto]
    ,[banco]
    ,[tipo_cuenta]
    ,[numero_cedula]
FROM [dbo].[Contacto]
WHERE [numero_cedula]=@numero_cedula