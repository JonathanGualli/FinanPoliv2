INSERT INTO [dbo].[CuentaCliente]
    (
    [fecha_vinculacion]
    ,[numero_cedula]
    ,[numero_cuenta]
    )   
VALUES (
    @fecha_vinculacion,
    @numero_cedula,
    @numero_cuenta
)