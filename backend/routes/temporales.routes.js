'use strict'

const express = require('express');
const temporalController = require('../controllers/temporal.controller');
const router = express.Router();

const { getTemporales, addTemporal } = temporalController;

router.get('/temporales', getTemporales);
router.post('/temporal', addTemporal);

module.exports = {
    routes: router
}
