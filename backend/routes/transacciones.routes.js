'use strict';

const express = require('express');
const transaccionController = require('../controllers/transacciones.controller');
const router = express.Router();

const {getTransacciones, getTransaccion, addTransaccion} = transaccionController;

router.get('/transacciones', getTransacciones);
router.get('/transaccion/:id', getTransaccion);
router.post('/transaccion', addTransaccion);

module.exports = {
    routes: router
}

