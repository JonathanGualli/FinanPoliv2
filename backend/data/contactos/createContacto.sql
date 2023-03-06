INSERT INTO [dbo].[Contacto]
    (
[numero_identificacion],
[numero_cuenta],
[nombre_contacto],
[banco],
[tipo_cuenta],
[numero_cedula]
    )   
VALUES (
@numero_identificacion,
@numero_cuenta,
@nombre_contacto,
@banco,
@tipo_cuenta,
@numero_cedula
)