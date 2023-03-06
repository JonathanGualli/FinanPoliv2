'use strict'

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const createContacto = async (contactoData) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('contactos');
        const addContacto = await pool.request()
                                    .input('numero_identificacion', sql.Char(10), contactoData.numero_identificacion)
                                    .input('numero_cuenta', sql.Char(10), contactoData.numero_cuenta)
                                    .input('nombre_contacto', sql.VarChar(60), contactoData.nombre_contacto)
                                    .input('banco', sql.VarChar(30), contactoData.banco)
                                    .input('tipo_cuenta', sql.VarChar(10), contactoData.tipo_cuenta)
                                    .input('numero_cedula', sql.Char(10), contactoData.numero_cedula)
                                    .query(sqlQueries.createContacto);
        return addContacto.recordset;
    } catch (error){
        return error.message;
    }
        
}

module.exports={
    createContacto
}