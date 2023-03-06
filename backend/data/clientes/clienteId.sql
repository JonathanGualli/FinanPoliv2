SELECT [numero_cedula]
    ,[nombres]
    ,[apellidos]
    ,[fecha_nacimiento]
    ,[numero_telefono]
    ,[correo_electronico]
    ,[ciudad_residencia]
    ,[direccion_domicilio]
    ,[situacion_laboral]
    ,[estado_financiero]
    ,[usuario]
    -- ,[clave]
    ,[estado_cliente]
    ,CONVERT(VARCHAR(50), DECRYPTBYPASSPHRASE('FinanPoli', [clave])) AS 'clave'
FROM [dbo].[Cliente]
WHERE [numero_cedula]=@numero_cedula