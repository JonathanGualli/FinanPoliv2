'use strict'

const contactoData = require('../data/contactos');


const addContacto = async(req, res, next) =>{
    try{
        const data = req.body;
        const createdcontacto = await contactoData.createContacto(data)
        res.send(createdcontacto);
    } catch (error){
        res.status(400).send(error.message);
    }

}

module.exports={
    addContacto
}