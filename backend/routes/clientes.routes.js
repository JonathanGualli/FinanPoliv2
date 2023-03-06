'use strict';

const express = require('express');
const clienteController = require('../controllers/cliente.controller');
const router = express.Router();

const {getClientes, getCliente, addCliente, updateCliente, deleteCliente, getClienteUsuario, getClienteCuenta, getClienteContacto } = clienteController;

router.get('/clientes', getClientes);
router.get('/cliente/:id', getCliente);
router.post('/cliente', addCliente);
router.put('/cliente/:id', updateCliente);
router.delete('/cliente/:id', deleteCliente);
router.get('/clienteUsuario/:usuario', getClienteUsuario);
router.get('/clienteCuentas/:id', getClienteCuenta);
router.get('/clienteContacto/:id', getClienteContacto);

module.exports = {
    routes: router
}

