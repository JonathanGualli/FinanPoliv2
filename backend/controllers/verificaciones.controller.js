'use strict'

const { getTemplate, sendEmail, getTemplateNuevaCuentaRegistrado, getTemplateNuevaCuentaNoRegistrado } = require('../config/mail.config');
const { sendSMS } = require('../config/whatsapp.config');

const verificarCorreo = async (req, res) => {
    try{
    //obtener Template
    const data = req.body;
    const otp = data.clave;
    
    console.log(otp)

    const template = getTemplate(data.nombres, otp);
    //enviar email
    await sendEmail(data.correo_electronico, 'Email de verificación', template)
    .then(res.status(200).send({message: 'Finalizado con exito'}))

    } catch (error) {
        console.log(message.error);
    }
}

const verificarSMS = async (req, res) => {
    try{
        const data = req.body;
        console.log(data.usuario);
        await sendSMS(data.numero_telefono, ('Hola '+ data.nombres + ' ' + data.apellidos + '\nPara confirmar tu cuenta, ingresa el siguiente código de verificacion' + '\n*Tú código de verificación es: '+ data.usuario + '*'))
        .then(res.status(200).send({message: 'Finalizado con exito'}))
    
    } catch (error){
        console.log(error);
    }
}

const notificarNuevaCuenta = async (req, res) =>{
    try{
        //obtener Template
        const data = req.body;
        const numero_cuenta = data.numero_cuenta;
        const clave_temporal = data.clave_temporal;

        if(data.registrado == "true"){
            const template = getTemplateNuevaCuentaRegistrado(data.nombres, numero_cuenta);
            //enviar email
            await sendEmail(data.correo_electronico, 'Notificación nueva cuenta', template)
            .then(res.status(200).send({message: 'Finalizado con exito'}))
        } else {
            const template = getTemplateNuevaCuentaNoRegistrado(data.nombres, numero_cuenta, clave_temporal);
            //enviar email
            await sendEmail(data.correo_electronico, 'Notificación nueva cuenta', template)
            .then(res.status(200).send({message: 'Finalizado con exito'}))
        }
        
        } catch (error) {
            console.log(message.error);
        }
}


module.exports = {
    verificarCorreo,
    verificarSMS,
    notificarNuevaCuenta
}