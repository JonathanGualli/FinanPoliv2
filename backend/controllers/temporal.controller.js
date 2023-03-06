'use strict'

let temporal = "";

const getTemporales = async (req, res) => {
    console.log("consultar temporal");
    return res.status(400).send(temporal);
}

const addTemporal = async (req, res) => {
    console.log("añadir temporal");
    temporal = req.body;
    return res.status(400).send(temporal);
}

module.exports = {
    getTemporales,
    addTemporal,
}