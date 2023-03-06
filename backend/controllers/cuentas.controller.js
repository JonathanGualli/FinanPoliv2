'use strict'

const cuentaData = require('../data/cuentas');

const getCuentas = async (req, res, next) => {
    try{
        const cuentas = await cuentaData.getCuentas();
        res.send(cuentas);
    } catch (error){
        res.status(400).send(error.message);
    }
}


const getCuenta = async (req, res, next) =>{
    try{
        const numero_cuenta = req.params.id;
        //console.log(typeof(numero_cuenta));
        const cuenta = await cuentaData.getCuenta(numero_cuenta);
        //console.log(cliente.numero_cedula);
        console.log(cuenta == "");
        if(cuenta == ""){
            return res.status(404).send({message: 'La cuenta no existe en FinanPoli'})
        }
        return res.send(cuenta);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const addCuenta = async(req, res, next) =>{
    try{
        const data = req.body;
        //console.log(typeof(data));
        const createdcuenta = await cuentaData.createCuenta(data)
        res.send(createdcuenta)
        //return res.status(200).send({message: 'Cuenta Ingresada con exito'})
    } catch (error){
        res.status(400).send(error.message);
    }
}

const updateCuenta = async (req, res, next) =>{
    try {
        const numero_cuenta = req.params.id;
        const data = req.body;
        const updatedcuenta = await cuentaData.updateCuenta(numero_cuenta, data);
        res.send(updatedcuenta);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteCuenta = async (req, res, next) => {
    try {
        const numero_cuenta = req.params.id;
        const deletedcuenta = await cuentaData.deleteCuenta(numero_cuenta);
        res.send(deletedcuenta);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const addCuentaCliente = async (req, res, next) => {
    try {
        const data = req.body;
        const createdCuentaCliente = await cuentaData.createCuentaCliente(data)
        res.send(createdCuentaCliente);
    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getCuentas,
    getCuenta,
    addCuenta,
    updateCuenta,
    deleteCuenta,
    addCuentaCliente
}