'use strict'

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getClientes = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const clientes = await pool.request().query(sqlQueries.clienteList);
        return clientes.recordset;
    } catch (error){
        return error.message;
    }
}

const getCliente = async (numero_cedula) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const cliente = await pool.request()
                                .input ('numero_cedula', sql.Char(10), numero_cedula)
                                .query(sqlQueries.clienteId);
        //console.log(cliente);
        return cliente.recordset;
    } catch (error){
        return error.message;
    }
}

const getClienteUsuario = async (usuario) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const cliente = await pool.request()
                                .input ('usuario', sql.VarChar(20), usuario)
                                .query(sqlQueries.clienteUsuario);
        //console.log(cliente);
        return cliente.recordset;
    } catch (error){
        return error.message;
    }
}

const createCliente = async (clienteData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const addCliente = await pool.request()
                                    .input('numero_cedula', sql.Char(10), clienteData.numero_cedula)
                                    .input('nombres', sql.VarChar(30), clienteData.nombres)
                                    .input('apellidos', sql.VarChar(30), clienteData.apellidos)
                                    .input('fecha_nacimiento', sql.Date, clienteData.fecha_nacimiento)
                                    .input('numero_telefono', sql.Char(10), clienteData.numero_telefono)
                                    .input('correo_electronico', sql.VarChar(30), clienteData.correo_electronico)
                                    .input('ciudad_residencia', sql.VarChar(20), clienteData.ciudad_residencia)
                                    .input('direccion_domicilio', sql.VarChar(30), clienteData.direccion_domicilio)
                                    .input('situacion_laboral', sql.VarChar(30), clienteData.situacion_laboral)
                                    .input('estado_financiero', sql.VarChar(30), clienteData.estado_financiero)
                                    .input('usuario', sql.VarChar(20), clienteData.usuario)
                                    .input('clave', sql.VarBinary(255), Buffer.from( clienteData.clave))
                                    .input('estado_cliente', sql.VarChar(10), clienteData.estado_cliente)
                                    .query(sqlQueries.createCliente);
        return addCliente.recordset;
    } catch (error){
        return error.message;
    }
        
}

const updateCliente = async (numero_cedula, clienteData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const updateCliente = await pool.request()
                                    .input ('numero_cedula', sql.Char(10), numero_cedula)
                                    .input('nombres', sql.VarChar(30), clienteData.nombres)
                                    .input('apellidos', sql.VarChar(30), clienteData.apellidos)
                                    .input('fecha_nacimiento', sql.Date, clienteData.fecha_nacimiento)
                                    .input('numero_telefono', sql.Char(10), clienteData.numero_telefono)
                                    .input('correo_electronico', sql.VarChar(30), clienteData.correo_electronico)
                                    .input('ciudad_residencia', sql.VarChar(20), clienteData.ciudad_residencia)
                                    .input('direccion_domicilio', sql.VarChar(30), clienteData.direccion_domicilio)
                                    .input('situacion_laboral', sql.VarChar(30), clienteData.situacion_laboral)
                                    .input('estado_financiero', sql.VarChar(30), clienteData.estado_financiero)
                                    .input('usuario', sql.VarChar(20), clienteData.usuario)
                                    .input('clave', sql.VarBinary(255), Buffer.from( clienteData.clave))
                                    .input('estado_cliente', sql.VarChar(10), clienteData.estado_cliente)
                                    .query(sqlQueries.updateCliente);

        return updateCliente.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteCliente = async (numero_cedula) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const deletedCliente = await pool.request()
                                    .input('numero_cedula', sql.Char(10), numero_cedula)
                                    .query(sqlQueries.deleteCliente);
        return deletedCliente.recordset;
    } catch (error) {
        return error.message;
    }
}


const getClienteCuenta = async (numero_cedula) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const cliente = await pool.request()
                                .input ('numero_cedula', sql.Int, numero_cedula)
                                .query(sqlQueries.clienteCuenta);
        //console.log(cliente);
        return cliente.recordset;
    } catch (error){
        return error.message;
    }
}

const getClienteContacto = async (numero_cedula) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('clientes');
        const cliente = await pool.request()
                                .input ('numero_cedula', sql.Int, numero_cedula)
                                .query(sqlQueries.clienteContacto);
        //console.log(cliente);
        return cliente.recordset;
    } catch (error){
        return error.message;
    }
}

module.exports = {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente,
    getClienteUsuario,
    getClienteCuenta,
    getClienteContacto
}