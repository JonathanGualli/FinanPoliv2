'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientesRoutes = require ('./routes/clientes.routes.js');
const cuentasRoutes = require('./routes/cuentas.routes');
const transaccionesRoutes = require('./routes/transacciones.routes');
const verificacionesRoutes = require('./routes/verificaciones.routes');
const temporalesRoutes = require('./routes/temporales.routes');
const contactosRoutes = require('./routes/contactos.routes');
const resumenRoutes = require('./routes/resumen.routes');

const sendSMS = require('./config/whatsapp.config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../frontend'));

/*
app.use('/', clientesRoutes.routes, (req, res) =>{
    res.sendFile('D:/Documentos/Universidad/Sexto_Semestre/5.Ingenieria_de_software_II/FinanPoli/FinanPoli/frontend/index.html');   
});
*/

app.use('/', clientesRoutes.routes);
app.use('/', cuentasRoutes.routes);
app.use('/', transaccionesRoutes.routes)
app.use('/', verificacionesRoutes.routes);
app.use('/', temporalesRoutes.routes);
app.use('/', contactosRoutes.routes);
app.use('/', resumenRoutes.routes);


app.listen(config.port, () => {
    console.log('Server is listening on http://localhost: ' + config.port)
});


