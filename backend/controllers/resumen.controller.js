'use strict'

const { getTemplateResumen, sendEmail } = require('../config/mail.config');

const resumenTransaccion = async (req, res) =>{
    try{
        //obtener Template
        const data = req.body;
        // const numero_cuenta = data.numero_cuenta;
        // const clave_temporal = data.clave_temporal;

        const template = getTemplateResumen(data.valor, data.cuenta_origen, data.nombres_destino, data.cuenta_destino, data.cedula_destino, data.banco, data.fecha, data.descripcion, data.notificacion);
        //enviar email
        await sendEmail(data.notificacion, 'Notificación de una transaccion', template)
        .then(res.status(200).send({message: 'Finalizado con exito'}))

        } catch (error) {
            console.log(error);
        }
}

module.exports ={
    resumenTransaccion
}