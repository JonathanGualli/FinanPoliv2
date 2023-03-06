'use strict';

const express = require('express');
const contactoController = require('../controllers/contacto.controller');
const router = express.Router();

const {addContacto } = contactoController;


router.post('/contacto', addContacto);
//router.put('/contacto/:id', updateCliente);
//router.delete('/contacto/:id', deleteCliente);


module.exports = {
    routes: router
}

