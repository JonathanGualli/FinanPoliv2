UPDATE [dbo].[Cliente]
SET 
        [nombres]=@nombres
        ,[apellidos]=@apellidos
        ,[fecha_nacimiento]=@fecha_nacimiento
        ,[numero_telefono]=@numero_telefono
        ,[correo_electronico]=@correo_electronico
        ,[ciudad_residencia]=@ciudad_residencia
        ,[direccion_domicilio]=@direccion_domicilio
        ,[situacion_laboral]=@situacion_laboral
        ,[estado_financiero]=@estado_financiero
        ,[usuario]=@usuario
        ,[clave]=ENCRYPTBYPASSPHRASE('FinanPoli', @clave)
        ,[estado_cliente]=@estado_cliente
WHERE [numero_cedula]=@numero_cedula

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
    --,[clave]
    ,CONVERT(VARCHAR(50), DECRYPTBYPASSPHRASE('FinanPoli', [clave])) AS 'clave'
    ,[estado_cliente]
FROM [dbo].[Cliente]
WHERE [numero_cedula]=@numero_cedula