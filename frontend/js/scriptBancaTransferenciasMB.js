'use strict'

const formTransferencia = document.getElementById("form-transferencia");

let data = localStorage.getItem("data");
let clienteData;
let cuentasData;
let contactosData;
let cuentaSeleccionada;
let contactoSeleccionado;

let divColocarSaldoCuenta;
let divColocarInfoCuenta;

let divColocarIcono = document.querySelector("#colocarIcono");
let divColocarInfoCliente  = document.querySelector("#colocarInfoCliente");

let divColocarContacto = document.querySelector("#colocarContacto");

fetch(('http://localhost:4040/cliente/'+ data.substring(1,11)))
.then(res => res.json())
.then(data => {
    clienteData = data[0];

    fetch('http://localhost:4040/clienteCuentas/' + data[0].numero_cedula)
    .then(res => res.json())
    .then(dataCuenta => {
        cuentasData = dataCuenta;
        //cuentaSeleccionada = dataCuenta[0];

        fetch('http://localhost:4040/clienteContacto/' + clienteData.numero_cedula)
        .then(res => res.json())
        .then(dataContactos => {
            contactosData = dataContactos;
            colocarNombre();
            colocarCuenta();
            //colocarContactos();
            // console.log(clienteData);
            // console.log(cuentasData);
            //console.log(contactosData);
        })

    });
})    

function colocarNombre() {
    let putNombre = document.querySelector('#nombreUsuario');
    putNombre.append(clienteData.nombres + ' ' + clienteData.apellidos);
}

function salir(){
    localStorage.setItem("data", "");
    location.href="index.html";
}

function colocarCuenta () {
    
    for(let i=0; i<cuentasData.length; i++){
        let ruta = 'http://localhost:4040/cuenta/' + cuentasData[i].numero_cuenta;
        //console.log(ruta);
        fetch(ruta)
        .then(res => res.json())
        .then(cuenta => {

            let tipo_cuenta;

                if(cuenta[0].tipo_cuenta == "Corriente"){
                    tipo_cuenta = "Cuenta Corriente"
                } else {
                    tipo_cuenta = "Cuenta de Ahorros";
                }

            if(i==0){

                cuentaSeleccionada = cuenta[i];

                divColocarInfoCuenta = document.querySelector("#colocarInfoPrimeraCuenta");

                let p1 = document.createElement("p");
                p1.setAttribute("class", "text-start");
                p1.setAttribute("style", "font-size: 1.3rem");

                p1.innerHTML=(tipo_cuenta);
                
                divColocarInfoCuenta.append(p1);

                let p2 = document.createElement("p");
                p2.setAttribute("class", "text-start");
                p2.setAttribute("style", "margin-top: -15px; margin-bottom: -20px; font-size: 1.1rem;");
                p2.innerHTML=(cuenta[i].numero_cuenta);

                divColocarInfoCuenta.append(p2);

                divColocarSaldoCuenta = document.querySelector("#colocarSaldoPirmeraCuenta");

                let p3 = document.createElement("p");
                p3.setAttribute("class", "text-end");
                p3.setAttribute("style", "font-size: 1.4rem; margin-bottom: -20px; color: rgb(0, 110, 0); margin-top: 10px;");
                p3.innerHTML=(cuenta[i].saldo + " USD");

                divColocarSaldoCuenta.append(p3);
                
                colocarContactos();
            }

            let divColocarCuentas = document.querySelector("#colocarCuentas");

            let li1 = document.createElement("li");
            divColocarCuentas.append(li1);

            let a1 = document.createElement("a");
            a1.setAttribute("class", "dropdown-item")
            a1.setAttribute("onclick", "seleccionarCuenta"+"("+cuenta[0].numero_cuenta+")");
            a1.innerHTML=(tipo_cuenta + " - " + cuenta[0].numero_cuenta);
            li1.append(a1);  
        })
    }
} 

function colocarContactos(){

    divColocarContacto.innerHTML="";

    for(let i=0; i<contactosData.length; i++){

            // console.log(contactosData[i].numero_identificacion)
            // console.log(typeof(contactosData[i].numero_identificacion))

            // console.log(contactosData[i].numero_cuenta)
            // console.log(typeof(contactosData[i].numero_cuenta))        
            
            // console.log("-------------------------------")

            // console.log(clienteData.numero_cedula)
            // console.log(typeof(clienteData.numero_cedula))

            // console.log(cuentaSeleccionada.numero_cuenta)
            // console.log(typeof(cuentaSeleccionada.numero_cuenta))

            // console.log("**********************************")

        if((contactosData[i].numero_cuenta == cuentaSeleccionada.numero_cuenta)){
            console.log("pase por aqui")
            continue;
        }
        


        let li = document.createElement("li");
        divColocarContacto.append(li);

        let a = document.createElement("a");
        a.setAttribute("class", "dropdown-item");
        a.setAttribute("onclick", "seleccionarContacto(" + contactosData[i].numero_identificacion + ", " + contactosData[i].numero_cuenta + ")");
        li.append(a);

        let div1 = document.createElement("div");
        div1.setAttribute("class", "row");
        a.append(div1);

        let div2 = document.createElement("div2");
        div2.setAttribute("class", "col-2");
        div2.setAttribute("style", "display: flex; justify-content: center; align-items: center;");
        div1.append(div2);

        let i1 = document.createElement("i");
        i1.setAttribute("class", "fa-solid fa-user");
        i1.setAttribute("style", "font-size: 35px; color: #38d39f;");
        div2.append(i1);

        let div3 = document.createElement("div");
        div3.setAttribute("class", "col-10");
        div1.append(div3);

        let p1 = document.createElement("p");
        p1.setAttribute("style", "margin-bottom: -15px; margin-top: -10px; font-size: 1.2rem; color: green;");
        div3.append(p1);

        let b = document.createElement("b");
        b.innerHTML=(contactosData[i].nombre_contacto);
        p1.append(b);

        let p2 = document.createElement("p");
        p2.setAttribute("style", "margin-bottom: -18px; font-size: 0.9rem; color: #666;");
        p2.innerHTML=(contactosData[i].banco);
        div3.append(p2);

        
        let p3 = document.createElement("p");
        p3.setAttribute("style", "margin-bottom: -10px; font-size: 0.9rem; color: #666;");
        p3.innerHTML=(contactosData[i].numero_cuenta);
        div3.append(p3);
    }
}

function seleccionarCuenta (id) {

    //fetch('http://localhost:4040/cuentas')

    divColocarInfoCuenta.innerHTML="";
    divColocarSaldoCuenta.innerHTML="";

    //console.log(id);
    //console.log(cuentasData);

    let cuenta = cuentasData.find(element => element.numero_cuenta === (id+""));

    fetch('http://localhost:4040/cuenta/'+ cuenta.numero_cuenta)
    .then(res => res.json())
    .then(data => {

        cuentaSeleccionada = data[0];
        //console.log(cuentaSeleccionada);

        let tipo_cuenta;

        if(data[0].tipo_cuenta == "Corriente"){
            tipo_cuenta = "Cuenta Corriente"
        } else {
            tipo_cuenta = "Cuenta de Ahorros";
        }
    
        divColocarInfoCuenta = document.querySelector("#colocarInfoPrimeraCuenta");
    
        let p1 = document.createElement("p");
        p1.setAttribute("class", "text-start");
        p1.setAttribute("style", "font-size: 1.3rem");
    
        p1.innerHTML=(tipo_cuenta);
                    
        divColocarInfoCuenta.append(p1);
    
        let p2 = document.createElement("p");
        p2.setAttribute("class", "text-start");
        p2.setAttribute("style", "margin-top: -15px; margin-bottom: -20px; font-size: 1.1rem;");
        p2.innerHTML=(data[0].numero_cuenta);
    
        divColocarInfoCuenta.append(p2);
    
        divColocarSaldoCuenta = document.querySelector("#colocarSaldoPirmeraCuenta");
    
        let p3 = document.createElement("p");
        p3.setAttribute("class", "text-end");
        p3.setAttribute("style", "font-size: 1.4rem; margin-bottom: -20px; color: rgb(0, 110, 0); margin-top: 10px;");
        p3.innerHTML=(data[0].saldo + " USD");
    
        divColocarSaldoCuenta.append(p3);


        colocarContactos();
        divColocarIcono.innerHTML="";
        divColocarInfoCliente.innerHTML="";


    })

}

function seleccionarContacto (numero_identificacion, numero_cuenta){

    contactoSeleccionado = contactosData.find(element => ((element.numero_identificacion ==  numero_identificacion) && (element.numero_cuenta == numero_cuenta)));

    //console.log(contacto)
    // let divColocarIcono = document.querySelector("#colocarIcono");
    // let divColocarInfoCliente  = document.querySelector("#colocarInfoCliente");

    divColocarIcono.innerHTML="";
    divColocarInfoCliente.innerHTML="";

    let i1 = document.createElement("i");
    i1.setAttribute("class", "fa-solid fa-user");
    i1.setAttribute("style", "font-size: 35px; color: #38d39f; margin-top: 20px;");
    divColocarIcono.append(i1);

    let p1 = document.createElement("p");
    p1.setAttribute("class", "text-start");
    p1.setAttribute("style", "margin-top: 5px; margin-bottom: -2px; font-size: 1.2rem; color: green;");
    divColocarInfoCliente.append(p1);

    let b = document.createElement("b");
    b.innerHTML=(contactoSeleccionado.nombre_contacto);
    p1.append(b);

    let p2 = document.createElement("p");
    p2.setAttribute("class", "text-start");
    p2.setAttribute("style", "margin-bottom: -2px; font-size: 0.9rem; color: #666;");
    p2.innerHTML=(contactoSeleccionado.banco);
    divColocarInfoCliente.append(p2);

    
    let p3 = document.createElement("p");
    p3.setAttribute("class", "text-start");
    p3.setAttribute("style", "margin-bottom: -20px; font-size: 0.9rem; color: #666;");
    p3.innerHTML=(contactoSeleccionado.numero_cuenta);
    divColocarInfoCliente.append(p3);

    let btnAceptar = document.querySelector("#btnAceptar");
    btnAceptar.removeAttribute("disabled")

}

function cancelarEnter(){
    var key = event.keyCode;

    if (key === 13) {
        event.preventDefault();
    }
}

formTransferencia.addEventListener("submit", function(event){
    event.preventDefault();

    let transferenciaData = new FormData(formTransferencia);
    let transaccion;

    fetch('http://localhost:4040/transacciones')
    .then(res => res.json())
    .then(transacciones => {
        //console.log(transacciones);

        let id = transacciones.length;
        id++;
        //console.log(typeof(id));

        for(let i=0; i<9; i++){
            id = "0"+id;
            if(id.length == 10){
                break;
            }
            // console.log(typeof(prueba.length));
        }

        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
    
        let fechaActual = (year + "-" + month + "-" + day);

        var today = new Date();
        var time = today.toLocaleTimeString();

        //console.log(now);
        var fechaHora = fechaActual + " " + time;

        transaccion = {
            id_transaccion: id,
            numero_cedula: clienteData.numero_cedula,
            numero_cuenta: cuentaSeleccionada.numero_cuenta,
            tipo_transaccion: "Transferencia",
            fecha_hora: fechaHora,
            monto: transferenciaData.get("monto"),
            cuenta_origen: cuentaSeleccionada.numero_cuenta,
            cuenta_destino: contactoSeleccionado.numero_cuenta,
            detalles_adicionales: transferenciaData.get("txaDescripcion"),
            estado_transaccion: "Exitoso"
        }

        // console.log(transaccion);
        // console.log(parseInt(transferenciaData.get("monto")));
        // console.log(typeof(parseInt(transferenciaData.get("monto"))));
        // console.log(cuentaSeleccionada.saldo);

        let transaccionJson = JSON.stringify(transaccion);

        //console.log(parseInt(transferenciaData.get("monto")) > parseInt(cuentaSeleccionada.saldo));

        if(parseFloat(transferenciaData.get("monto")) > parseFloat(cuentaSeleccionada.saldo)){
            swal({
                title: "Oops!",
                text: "No cuenta con los fondos suficientes para continuar con la transacción",
                icon: "error",
                button: "Intenter nuevamente"
            })
            //alert('No cuenta con los fondos suficientes para continuar con la transacción')
        } else {
            if(parseFloat(transferenciaData.get("monto")) > parseFloat(cuentaSeleccionada.liminte)){
                swal({
                    title: "Oops!",
                    text: 'Lo sentimos el límite de transacciones diarias para la cuenta ' + cuentaSeleccionada.numero_cuenta + " es de " + cuentaSeleccionada.liminte + " USD",
                    icon: "warning",
                    button: "Intenter nuevamente"
                })
                //alert('Lo sentimos el límite de transacciones diarias para la cuenta ' + cuentaSeleccionada.numero_cuenta + " es de " + cuentaSeleccionada.liminte);
            } else {
                fetch('http://localhost:4040/transaccion', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }, 
                    body: transaccionJson,
                })
                .then(res => {
                    if(res.ok){
                        //alert('Transacción ejecutada con exito');
                        //location.reload();
                        let divTransferencia = document.querySelector('#transferencia');
                        divTransferencia.setAttribute("style", "display:none");
                        let divResumenTransferencia = document.querySelector('#resumenTransferencia');
                        divResumenTransferencia.setAttribute("style", "max-width: 850px; margin-top: 50px; display: ''")
                        resumen(transaccion);

                        // let correoElectronico = clienteData.find(element => element.)
                        
                        // let cuenta = cuentasData.find(element => element.numero_cuenta === (id+""));
                        fetch('http://localhost:4040/cliente/' + contactoSeleccionado.numero_cedula)
                        .then(res => res.json())
                        .then(dataC =>{
                            let correoCliente = dataC[0].correo_electronico;
                            
                            let notificacionTransferencia ={
                                valor: (transferenciaData.get("monto") + " USD"),
                                cuenta_origen: cuentaSeleccionada.numero_cuenta,
                                nombres_destino: (contactoSeleccionado.nombre_contacto),
                                cuenta_destino: contactoSeleccionado.numero_cuenta,
                                cedula_destino: contactoSeleccionado.numero_cedula,
                                banco: "FinanPoli",
                                fecha: fechaActual,
                                descripcion: transferenciaData.get("txaDescripcion"),
                                notificacion: correoCliente
                            }
    
                            let notificacionTransferenciaJson = JSON.stringify(notificacionTransferencia);
                            console.log(notificacionTransferenciaJson);
    
                            fetch('http://localhost:4040/resumenTransaccion', {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                }, 
                                body: notificacionTransferenciaJson,
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                            })    
                        })
                        
                    } else {
                        swal({
                            title: "Oops!",
                            text: "Algo salió mal, intentalo de nuevo",
                            icon: "error",
                            button: "Intenter nuevamente"
                        })
                        //alert('Algo salió mal, vuelve a intentarlo denuevo')
                    }
                });
            }
        }
    });
});

function resumen (tr){
    let valor = document.getElementById("resumenMonto");
    let desde = document.getElementById("resumenDesde");
    let para = document.getElementById("resumenPara");
    let numeroCuenta = document.getElementById("resumenNumeroCuenta");
    let cedula = document.getElementById("resumenCedula");
    let nombreBanco = document.getElementById("resumenBanco");
    let fecha = document.getElementById("resumenFecha");
    let descripcion = document.getElementById("resumenDescripcion");
    let notificacion = document.getElementById("resumenNotificacion");

    valor.innerHTML="";
    valor.innerHTML=tr.monto + " USD";

    desde.innerHTML="";
    desde.innerHTML=tr.cuenta_origen;
    
    para.innerHTML="";
    para.innerHTML=contactoSeleccionado.nombre_contacto;

    numeroCuenta.innerHTML="";
    numeroCuenta.innerHTML=tr.cuenta_destino;

    cedula.innerHTML="";
    cedula.innerHTML=contactoSeleccionado.numero_cedula;

    nombreBanco.innerHTML="";
    nombreBanco.innerHTML=contactoSeleccionado.banco;

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    let fechaActual = (day + "-" + month + "-" + year);
    
    fecha.innerHTML="";
    fecha.innerHTML=fechaActual;

    descripcion.innerHTML="";
    descripcion.innerHTML=tr.tipo_transaccion;

    let ruta = 'http://localhost:4040/cliente/' + contactoSeleccionado.numero_identificacion;
    console.log(ruta);
    fetch(ruta)
    .then(res => res.json())
    .then(cliente => {
        notificacion.innerHTML="";
        notificacion.innerHTML=cliente[0].correo_electronico;
    })
    
}

function regresarInicio(){
    location.href="bancaProductos.html";
}
