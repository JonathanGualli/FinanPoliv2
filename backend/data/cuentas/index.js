'use strict'

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getCuentas = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('cuentas');
        const cuentas = await pool.request().query(sqlQueries.cuentasList);
        return cuentas.recordset;
    } catch (error){
        return error.message;
    }
}


const getCuenta = async (numero_cuenta) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('cuentas');
        const cuenta = await pool.request()
                                .input ('numero_cuenta', sql.Char(10), numero_cuenta)
                                .query(sqlQueries.cuentaId);
        //console.log(cliente);
        return cuenta.recordset;
    } catch (error){
        return error.message;
    }
}

const createCuenta = async (cuentaData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('cuentas');
        const addCuenta = await pool.request()
                                    .input('numero_cuenta', sql.Char(10), cuentaData.numero_cuenta)
                                    .input('tipo_cuenta', sql.VarChar(10), cuentaData.tipo_cuenta)
                                    .input('fecha_creacion', sql.Date, cuentaData.fecha_creacion)
                                    .input('saldo', sql.Float, cuentaData.saldo)
                                    .input('intereses', sql.Float, cuentaData.intereses)
                                    .input('liminte', sql.Float, cuentaData.liminte)
                                    .input('estado', sql.VarChar(10), cuentaData.estado)
                                    .query(sqlQueries.createCuenta);
        return addCuenta.recordset;

    } catch (error){
        return error.message;
    }
        
}

const updateCuenta = async (numero_cuenta, cuentaData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('cuentas');
        const updateCuentas = await pool.request()
                                    .input('numero_cuenta', sql.Char(10), numero_cuenta)
                                    .input('tipo_cuenta', sql.VarChar(10), cuentaData.tipo_cuenta)
                                    .input('fecha_creacion', sql.Date, cuentaData.fecha_creacion)
                                    .input('saldo', sql.Float, cuentaData.saldo)
                                    .input('intereses', sql.Float, cuentaData.intereses)
                                    .input('liminte', sql.Float, cuentaData.liminte)
                                    .input('estado', sql.VarChar(10), cuentaData.estado)
                                    .query(sqlQueries.updateCuenta);
        return updateCuentas.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteCuenta = async (numero_cuenta) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('cuentas');
        const deletedCuenta = await pool.request()
                                    .input('numero_cuenta', sql.Char(10), numero_cuenta)
                                    .query(sqlQueries.deleteCuenta);
        return deletedCuenta.recordset;
    } catch (error) {
        return error.message;
    }
}

const createCuentaCliente = async (cuentaClienteData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('cuentas');
        const addCuentaCliente = await pool.request()
                                    .input('fecha_vinculacion', sql.Date, cuentaClienteData.fecha_vinculacion)
                                    .input('numero_cedula', sql.Char(10), cuentaClienteData.numero_cedula)
                                    .input('numero_cuenta', sql.Char(10), cuentaClienteData.numero_cuenta)
                                    .query(sqlQueries.addCuentaCliente);
        return addCuentaCliente.recordset;

    } catch (error){
        return error.message;
    }
        
}

module.exports = {
    getCuentas,
    getCuenta,
    createCuenta,
    updateCuenta,
    deleteCuenta,
    createCuentaCliente
}