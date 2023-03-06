'use strict'

const express = require('express');
const cuentaController = require('../controllers/cuentas.controller');
const router = express.Router();

const {getCuentas, getCuenta, addCuenta, updateCuenta, deleteCuenta, addCuentaCliente} = cuentaController;

router.get('/cuentas', getCuentas);
router.get('/cuenta/:id', getCuenta);
router.post('/cuenta', addCuenta);
router.put('/cuenta/:id', updateCuenta);
router.delete('/cuenta/:id', deleteCuenta);
router.post('/cuentaCliente', addCuentaCliente);
//router.post('clienteCuenta', addClienteCuenta);

module.exports = {
    routes: router
}
