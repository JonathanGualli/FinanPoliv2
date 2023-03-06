INSERT INTO [dbo].[transaccion]
    (
        [id_transaccion],
        [numero_cedula],
        [numero_cuenta],
        [tipo_transaccion],
        [fecha_hora],
        [monto],
        [cuenta_origen],
        [cuenta_destino],
        [detalles_adicionales],
        [estado_transaccion]
    )   
VALUES (
        @id_transaccion,
        @numero_cedula,
        @numero_cuenta,
        @tipo_transaccion,
        @fecha_hora,
        @monto,
        @cuenta_origen,
        @cuenta_destino,
        @detalles_adicionales,
        @estado_transaccion
)
UPDATE [dbo].[Cuenta] 
SET [saldo] = [saldo] - @monto
WHERE [numero_cuenta] = @cuenta_origen

UPDATE [dbo].[Cuenta] 
SET [saldo] = [saldo] + @monto
WHERE [numero_cuenta] = @cuenta_destino


