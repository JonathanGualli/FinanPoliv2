'use strict'

const transaccionData = require('../data/transacciones');

const getTransacciones = async (req, res, next) => {
    try{
        const transacciones = await transaccionData.getTransacciones();
        res.send(transacciones);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const getTransaccion = async (req, res, next) =>{
    try{
        const id_transaccion = req.params.id;
        //console.log(typeof(numero_cedula));
        const transaccion = await transaccionData.getTransaccion(id_transaccion);
        //console.log(cliente.numero_cedula);
        console.log(transaccion == "");
        if(transaccion == ""){
            return res.status(404).send({message: 'La transaccion requerida no existe'})
        }
        return res.send(transaccion);
    } catch (error){
        res.status(400).send(error.message);
    }
}

const addTransaccion = async(req, res, next) =>{
    try{
        const data = req.body;
        //console.log(typeof(data));
        const transaccion = await transaccionData.getTransaccion(data.id_transaccion)
        //console.log(data.numero_cedula);
        //console.log(cliente);
        const createdtransaccion = await transaccionData.createTransaccion(data)
        return res.status(200).send(createdtransaccion)

    } catch (error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTransacciones,
    getTransaccion,
    addTransaccion,
}