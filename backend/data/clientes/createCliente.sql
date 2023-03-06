INSERT INTO [dbo].[Cliente]
    (
        [numero_cedula]
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
        ,[clave]
        ,[estado_cliente]

    )   
VALUES (
        @numero_cedula
        ,@nombres
        ,@apellidos
        ,@fecha_nacimiento
        ,@numero_telefono
        ,@correo_electronico
        ,@ciudad_residencia
        ,@direccion_domicilio
        ,@situacion_laboral
        ,@estado_financiero
        ,@usuario
        ,ENCRYPTBYPASSPHRASE('FinanPoli', @clave)
        ,@estado_cliente
)