INSERT INTO [dbo].[Cuenta]
    (
    [numero_cuenta]
    ,[tipo_cuenta]
    ,[fecha_creacion]
    ,[saldo]
    ,[intereses]
    ,[liminte]
    ,[estado]
    )   
VALUES (
    @numero_cuenta
    ,@tipo_cuenta
    ,@fecha_creacion
    ,@saldo
    ,@intereses
    ,@liminte
    ,@estado
)