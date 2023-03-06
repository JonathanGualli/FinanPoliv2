'use strict'

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getTransacciones = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('transacciones');
        const transacciones = await pool.request().query(sqlQueries.transaccionList);
        return transacciones.recordset;
    } catch (error){
        return error.message;
    }
}

const getTransaccion = async (id_transaccion) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('transacciones');
        const transaccion = await pool.request()
                                .input ('id_transaccion', sql.Int, id_transaccion)
                                .query(sqlQueries.transaccionId);
        //console.log(cliente);
        return transaccion.recordset;
    } catch (error){
        return error.message;
    }
}

const createTransaccion = async (transaccionData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('transacciones');
        const addTransaccion = await pool.request()
                                    .input('id_transaccion', sql.Char(10), transaccionData.id_transaccion)
                                    .input('numero_cedula', sql.Char(10), transaccionData.numero_cedula)
                                    .input('numero_cuenta', sql.Char(10), transaccionData.numero_cuenta)
                                    .input('tipo_transaccion', sql.VarChar(20), transaccionData.tipo_transaccion)
                                    .input('fecha_hora', sql.DateTime, transaccionData.fecha_hora)
                                    .input('monto', sql.Float, transaccionData.monto)
                                    .input('cuenta_origen', sql.Char(10), transaccionData.cuenta_origen)
                                    .input('cuenta_destino', sql.Char(10), transaccionData.cuenta_destino)
                                    .input('detalles_adicionales', sql.VarChar(100), transaccionData.detalles_adicionales)
                                    .input('estado_transaccion', sql.VarChar(20), transaccionData.estado_transaccion)
                                    .query(sqlQueries.createTransaccion);
        return addTransaccion.recordset;
    } catch (error){
        return error.message;
    }
        
}

module.exports = {
    getTransacciones,
    getTransaccion,
    createTransaccion
}