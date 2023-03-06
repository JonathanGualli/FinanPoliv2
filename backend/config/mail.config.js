const nodemailer = require('nodemailer');

const mail = {
    user: 'jonathan.gualli@epn.edu.ec',
    pass: 'Jg1752506251'
}

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: {
        rejectUnauthorized: false
    },
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
});

const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `FinanPoli <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Confirmacioón de correo electrónico", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}

const getTemplate = (name, otp) => {
    console.log(otp);
    return `
        <div id="email___content">
            <img src="../../frontend/resources/img/logo.png" alt="">
            <h2>Hola ${ name }</h2>
            <p>Para confirmar tu cuenta, ingresa el siguiete código de verificación</p>
            <!-- <a
                href="http://localhost:4040/confirmacion.html"
                target="_blank"
            >Confirmar Cuenta</a> -->
            <h1>Tu código de verificación es: ${ otp }</h1>
        </div>
    `;
}

const getTemplateNuevaCuentaRegistrado = (name, numero_cuenta) => {
    return `
        <div id="email___content">
            <img src="../../frontend/resources/img/logo.png" alt="">
            <h1>Felicidades ${ name } !!!</h1>
            <p>Ahora eres titular de una nueva cuenta, puedes ingresar a la banca web para utilizarla</p>
            <h2>El número de tu nueva cuenta es: ${numero_cuenta}</h2>
        </div>
    `;
}

const getTemplateNuevaCuentaNoRegistrado = (name, numero_cuenta, clave_temporal) => {
    return `
        <div id="email___content">
            <img src="../../frontend/resources/img/logo.png" alt="">
            <h1>Felicidades ${ name } !!!</h1>
            <p>Ahora eres titular de una nueva cuenta</p>
            <p>Para acceder a tu nueva cuenta, registrate en la banca web</p>
            <p>Sigue estos pasos para registrarte:</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;1. Ingresa a la página de inicio de FinanPoli</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;2. Ingresa a la opción <b>Acceso Clientes</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;3. Escoge la opcíon de <b>¡Registarse Ahora!</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;4. Ingresa tu número de cedula y tu clave temporal</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;5. Crea un usuario y contraseña</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;6. Disfruta de la banca web <b>FinanPoli</b></p>
            <h3>El número de tu nueva cuenta es: ${numero_cuenta}</h3>
            <h3>tu clave temporal es: ${clave_temporal}</h3>
        </div>
    `;
}

const getTemplateResumen = (valor, cuenta_origen, nombres_destino, cuenta_destino, cedula_destino, banco, fecha, descripcion, notificacion) => {
    return `
    <div id="resumenTransferencia" class="container" style="max-width: 850px; display: block;">
    <div id="resumenT">
        <div id="resumenTitulo" >
            <i class="fa-regular fa-circle-check" style="font-size: 5rem; color: green; display: flex;
            text-align: center; justify-content: center;
            margin-top: 30px;"></i>

            <p class="text-center" style="margin-top: 10px; font-size: 1.3rem;
            color: rgb(4, 75, 4)"><b>Transacción exitosa</b></p>
            <p class="text-center" style="margin-top: -22px;
            color: #777">Tu transacción se realizó correctamente</p>
        </div>

        <div style="margin-top: 25px; border-bottom: 2px solid green; width: 98%;">
            <div style="margin-bottom: -15px; text-align: left;">
                <p class="text-start" style="color: #777;text-align: left; "><b>Valor</b></p>
                
                </div>
            
            <div style="margin-bottom: -15px;">
                <p class="text-end" id="resumenMonto" style=" text-align: left;"><b>${valor}</b></p>
            
            </div>    
        </div>

        <div style="margin-top: 10px; border-bottom: 2px solid green; width: 98%;">
            <div>
                <p style="margin-bottom: 0px;"><b>Desde</b></p>
                <p id="resumenDesde" style="color: #777;margin-top: 0px;">${cuenta_origen}</p>

                <p style="margin-bottom: 0px;"><b>Para</b></p>
                <p class="fn-resumen" id="resumenPara" style="margin-top: 0px;color: #777">${nombres_destino}</p>

                <p class="fn-resumen" style="margin-bottom: 0px;"><b>Número de cuenta</b></p>
                <p class="fn-resumen" id="resumenNumeroCuenta" style="margin-top: 0px;color: #777">${cuenta_destino}</p>

                <p class="fn-resumen" style="margin-bottom: 0px;"><b>Cedula</b></p>
                <p class="fn-resumen" id="resumenCedula" style="margin-top: 0px;color: #777">${cedula_destino}</p>

                <p style="margin-bottom: 0px; "><b>Nombre del banco</b></p>
                <p style="margin-bottom: -1px; color: #777; margin-top: 0px;" id="resumenBanco">${banco}</p>

            </div>
            
        </div>

        <div style="margin-top: 10px; width: 98%; margin-bottom: 30px;">
            <div >
                <p style="margin-bottom: 0px;"><b>Fecha</b></p>
                <p class="fn-resumen" id="resumenFecha" style="margin-top: 0px;color: #777">${fecha}</p>

                <p class="fn-resumen" style="margin-bottom: 0px;"><b>Descripción</b></p>
                <p class="fn-resumen" id="resumenDescripcion" style="margin-top: 0px;color: #777">${descripcion}</p>

                <p class="fn-resumen" style="margin-bottom: 0px;"><b>Notificación</b></p>
                <p class="fn-resumen" id="resumenNotificacion" style="margin-top: 0px;color: #777">${notificacion}</p>
            </div>

        </div>

    </div>
</div>
`;

};

module.exports = {
    sendEmail,
    getTemplate,
    getTemplateNuevaCuentaRegistrado,
    getTemplateNuevaCuentaNoRegistrado,
    getTemplateResumen
}
