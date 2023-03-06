'use strict'

const expres = require('express');
const verificacionController = require('../controllers/verificaciones.controller');
const router = expres.Router();

const { verificarCorreo, verificarSMS, notificarNuevaCuenta } = verificacionController;

router.post('/verificar', verificarCorreo);
router.post('/verificarSMS', verificarSMS);
router.post('/notificarNuevaCuenta', notificarNuevaCuenta);

module.exports = {
    routes: router
}

