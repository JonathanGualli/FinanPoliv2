'use strict'

const clienteData = require('../data/clientes');

const getClientes = async (req, res, next) => {
    try{
        const clientes = await clienteData.getClientes();
        res.send(clientes);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getCliente = async (req, res, next) =>{
    try{
        const numero_cedula = req.params.id;
        //console.log(typeof(numero_cedula));
        const cliente = await clienteData.getCliente(numero_cedula);
        //console.log(cliente.numero_cedula);
        if(cliente == ""){
            return res.status(404).send({message: 'El cliente no está registrado en FinanPoli'})
        }
        return res.send(cliente);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getClienteUsuario = async (req, res, next) =>{
    try{
        const usuario = req.params.usuario;
        //console.log(typeof(numero_cedula));
        const cliente = await clienteData.getClienteUsuario(usuario);
        //console.log(cliente.numero_cedula);
        if(cliente == ""){
            return res.status(404).send({message: 'El cliente no está registrado en FinanPoli o no ha creado un Usuario y clave'})
        }
        return res.send(cliente);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const addCliente = async(req, res, next) =>{
    try{
        const data = req.body;
        //console.log(typeof(data));
        const cliente = await clienteData.getCliente(data.numero_cedula)
        //console.log(data.numero_cedula);
        //console.log(cliente);
        if(cliente == ""){
            const createdcliente = await clienteData.createCliente(data)
            return res.send(createdcliente);
            //return res.status(200).send({message: 'Cliente Ingresado con exito'})
        } else {
            //res.send({message: 'Hola'});           
            //console.log(cliente);
            //return res.send(cliente);
            return res.status(409).send({message: 'El cliente ya se encuentra registrado en FinanPoli'})
            
        }

    } catch (error){
        res.status(400).send(error.message);
    }
}

const updateCliente = async (req, res, next) =>{
    try {
        const numero_cedula = req.params.id;
        const data = req.body;
        const updatedcliente = await clienteData.updateCliente(numero_cedula, data);
        res.send(updatedcliente);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const deleteCliente = async (req, res, next) => {
    try {
        const numero_cedula = req.params.id;
        const deletedcliente = await clienteData.deleteCliente(numero_cedula);
        res.send(deletedcliente);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getClienteCuenta = async (req, res, next) =>{
    try{
        const numero_cedula = req.params.id;
        //console.log(typeof(numero_cedula));
        const cliente = await clienteData.getClienteCuenta(numero_cedula);
        //console.log(cliente.numero_cedula);
        if(cliente == ""){
            return res.status(404).send({message: 'El cliente no tiene vinculado cuentas en FinanPoli'})
        }
        return res.send(cliente);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getClienteContacto = async (req, res, next) =>{
    try{
        const numero_cedula = req.params.id;
        //console.log(typeof(numero_cedula));
        const cliente = await clienteData.getClienteContacto(numero_cedula);
        //console.log(cliente.numero_cedula);
        if(cliente == ""){
            return res.status(404).send({message: 'El cliente no tiene agregado ningún contacto'})
        }
        return res.send(cliente);
    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getClientes,
    getCliente,
    addCliente,
    updateCliente,
    deleteCliente,
    getClienteUsuario,
    getClienteCuenta,
    getClienteContacto
}