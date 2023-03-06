'use strict'

const expres = require('express');
const resumenController = require('../controllers/resumen.controller');
const router = expres.Router();

const { resumenTransaccion } = resumenController;

router.post('/resumenTransaccion', resumenTransaccion);

module.exports = {
    routes: router
}

