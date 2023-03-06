const form = document.getElementById("form-cuentas");
const formValidar = document.getElementById("form-verificar-cliente");

let cuenta;
let clienteData;
let clientes=[];

let cuentaCliente;
let numeroCuenta;
let divCliente = document.querySelector('#agregarCliente');
let btnCliente = document.querySelector('#aniadir-titular')

let divNoCliente = document.querySelector("#noCliente");
let btnAceptar = document.querySelector('#agregar-cuenta');

let divTitulares = document.querySelector('#titulares-cuenta');

let banderaTitulares = 0;

function añadirTitular(){

    if (clientes.find(element => element.numero_cedula == clienteData.numero_cedula) != undefined){
        console.log('si existo papu');
        swal({
            title: "Sorry!",
            text: "El cliente, " + clienteData.nombres + " ya ha sido añadido como titular",
            icon: "warning",
            button: "Probar nuevamente!"
        });

        //alert('El cliente ' + clienteData.numero_cedula + ' ya ha sido añadido');
    } else {
        if(clientes.length < 4){

            btnAceptar.removeAttribute("disabled");
            clientes.push(clienteData);
            console.log(clientes);   
            console.log(clientes.length);
            
            let div1 = document.createElement("div")
            div1.setAttribute("class", "col-md-6");
            div1.setAttribute("id", ("client-" + clienteData.numero_cedula));
            divTitulares.append(div1);
        
            let div2 = document.createElement("div");
            div2.setAttribute("class", "input-group mb-3");
            div1.append(div2);
        
            let btnEliminar = document.createElement("button");
            btnEliminar.setAttribute("class", "btn btn-outline-danger");
            btnEliminar.setAttribute("type", "button");
            btnEliminar.setAttribute("id", ("buttonTitular"+ clienteData.numero_cedula));
            btnEliminar.setAttribute("onclick", "eliminarTitular(this)");
            btnEliminar.innerHTML=('X');
            div2.append(btnEliminar);
        
            // <input type="text" class="form-control" placeholder="Mishel Estefania Muela Sanchez" aria-label="Example text with button addon" aria-describedby="button-addon1" disabled> -->
        
            let inpTitular = document.createElement("input");
            inpTitular.setAttribute("type","text");
            inpTitular.setAttribute("class","form-control");
            inpTitular.setAttribute("disabled", "true")
            inpTitular.setAttribute("placeholder", (clienteData.nombres + ' ' + clienteData.apellidos));
            div2.append(inpTitular);

        } else {
            swal({
                title: "Sorry!",
                text: "El número máximo de titulares es de 4",
                icon: "warning",
                button: "Entiendo"
            });
            //alert('El número máximo de titulares es de 4')
        }
    }

    formValidar.reset();
    divCliente.innerHTML = "";
    btnCliente.style.display = "none";
}

function eliminarTitular(btn){
    let titular = btn.id.substring(13);
    console.log(titular);

    let indice = clientes.findIndex(element => element.numero_cedula === titular);
    let idDiv = "#"+titular;
    console.log(typeof(idDiv));
    let divTitular = document.querySelector('#client-'+ titular);

    clientes.splice(indice, 1);
    divTitular.remove();
    console.log(clientes);

    if(clientes.length != 0){
        btnAceptar.removeAttribute("disabled");
    } else {
        btnAceptar.setAttribute("disabled", "true");
    }


}


function cargarCliente(cliente){
    //console.log(cliente);

    clienteData = cliente[0];

    divNoCliente.innerHTML = "";
    divCliente.innerHTML = "";
    btnCliente.style.display = "";

    let nombres = document.createElement("h5");
    nombres.innerHTML=("<b>Nombe:</b> " + cliente[0].nombres + " " + cliente[0].apellidos);
    divCliente.append(nombres);

    let numero_cedula = document.createElement("h5");
    numero_cedula.innerHTML=("<b>CI: </b>" + clienteData.numero_cedula);
    divCliente.append(numero_cedula);

}

function noCliente(){
    divCliente.innerHTML = "";
    divNoCliente.innerHTML = "";
    btnCliente.style.display = "none";

    form.setAttribute("disabled", "false");
    let mensaje = document.createElement("h6");
    mensaje.innerHTML=("El cliente no está registrado en FinanPoli");
    divNoCliente.append(mensaje);
}

formValidar.addEventListener("submit", function(event){

    event.preventDefault();
    
    let cedula_cliente = document.querySelector("#cuentaTitular").value;

    let ruta = "http://localhost:4040/cliente/" + cedula_cliente;
    //console.log(ruta);

    fetch(ruta)
    .then(res => res.json())
    .then(data =>{ 
        if(data.message == "El cliente no está registrado en FinanPoli"){
            //console.log("hola")
            noCliente();
        } else {
            cargarCliente(data)
            //console.log(data);
        }
        
    })
    .catch(error => console.log(error))

});


function invertirCadena(cad){
    var separarCadena = cad.split("");
    var invertirArreglo = separarCadena.reverse();
    var unirArreglo =  invertirArreglo.join("");

    return unirArreglo;
}

form.addEventListener("submit", function(event){
    event.preventDefault();
    let cuentaData = new FormData(form);

    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    let fechaActual = (year + "-" + month + "-" + day);

    let cuentaIntereses;
    /* Inicio Caclular intereses */ 
    if(cuentaData.get("rbtnTipoCuentas") == "Corriente"){
        cuentaIntereses = 0.0075;
    } else {
        cuentaIntereses = 0;
    }
    /* Fin Caclular intereses */

    cuenta = {
        numero_cuenta: numeroCuenta,
        tipo_cuenta: cuentaData.get("rbtnTipoCuentas"),
        fecha_creacion: fechaActual,
        saldo: 10,
        intereses: cuentaIntereses,
        liminte: cuentaData.get("cuentaLimite"),
        estado: "Activa"
    }

    cuentaCliente = {
        fecha_vinculacion: fechaActual,
        numero_cedula: clientes[0].numero_cedula,
        numero_cuenta: numeroCuenta
    }

    numeroCuenta = invertirCadena(clientes[0].numero_cedula);
    CuentaExiste(numeroCuenta)

    // let cuentaJson = JSON.stringify(cuenta); 
    // let cuentaClienteJson = JSON.stringify(cuentaCliente);

    // console.log(cuentaJson);
    // console.log(cuentaClienteJson);

    // fetch("http://localhost:4040/cuenta", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     }, 
    //     body: cuentaJson,
    // }) 
    // .then(res => {
    //     if(res.ok) {
            
    //         fetch("http://localhost:4040/cuentaCliente", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: cuentaClienteJson,
    //         })
    //         alert("Cliente ingresado con exito")
    //         location.reload();
    //     } else {
    //         alert("Algo salio mal, vuelva a intentarlo");
    //         location.reload();
    //     }
    // })
    
});

function CuentaExiste(numero_cuenta){

    numeroCuenta = numero_cuenta+"";
    console.log(typeof(numeroCuenta));
    let ruta = "http://localhost:4040/cuenta/" + numeroCuenta;

    fetch(ruta)
    .then(res => res.json())
    .then(data =>{ 

        if(data.message == "La cuenta no existe en FinanPoli"){
            cuenta.numero_cuenta = numeroCuenta;
            cuentaCliente.numero_cuenta = numeroCuenta;
            registar(cuenta, cuentaCliente);
        } else {
            numeroCuenta = parseInt(numeroCuenta, 10);
            numeroCuenta += 1;
            CuentaExiste(numeroCuenta);
        }
        
    })
    .catch(error => console.log(error))
}

function registar(cuenta, cuentaCliente){
    
    let cuentaJson = JSON.stringify(cuenta);   

    fetch("http://localhost:4040/cuenta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: cuentaJson,
    }) 
    .then(res => {
        if(res.ok) {

            for(let i=0; i<clientes.length; i++){
                cuentaCliente.numero_cedula = clientes[i].numero_cedula;
                let cuentaClienteJson = JSON.stringify(cuentaCliente); 

                fetch("http://localhost:4040/cuentaCliente", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: cuentaClienteJson,
                })
                .then(res => {
                    if(res.ok){
                        estaRegistrado(clienteData);
                    }
                })
                //alert("Cliente: " + clientes[i].numero_cedula + " vinculado con exito");
                //location.reload();
            }
        } else {
            swal({
                title: "Oops!",
                text: "Algo salio mal, vuelva a intentarlo nuevamente",
                icon: "error",
            });
            //alert("Algo salio mal, vuelva a intentarlo");
            //location.reload();
        }
    })

}

function estaRegistrado(){

    console.log("estoy en la funcion")

    for(let i=0; i<clientes.length; i++){

        if(clientes[i].usuario == ""){

            console.log('no estoy registrado');
            
            const clave_temporal = `${Math.floor(10000 + Math.random() * 9000)}`;
            console.log(clave_temporal);

            let notificacionTemp = {
                numero_cuenta: numeroCuenta,
                correo_electronico: clientes[i].correo_electronico,
                nombres: clientes[i].nombres,
                clave_temporal: clave_temporal,
                registrado: "false"
            };

            console.log(notificacionTemp);

            let clienteActualizado = clientes[i];
            clienteActualizado.clave = clave_temporal;

            let clienteActualizadoJson = JSON.stringify(clienteActualizado);

            fetch('http://localhost:4040/cliente/'+clienteActualizado.numero_cedula, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: clienteActualizadoJson,
            }) 
            .then(res =>{
                if(res.ok){

                    let notificacionTempJson = JSON.stringify(notificacionTemp);

                    fetch('http://localhost:4040/notificarNuevaCuenta', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: notificacionTempJson,
                    })
                    .then(res => {
                        if(res.ok){
                            swal({
                                title: "Genial!",
                                text: "Cliente/s vinculado/s con exito",
                                icon: "success",
                                button: true,
                            })
                            .then(continuar => {
                                if(continuar){
                                    location.reload();
                                }
                            })
                        }
                    })
                }
            })
            
        } else {
            console.log('ya tengo una cuenta brooo');

            const clave_temporal = `${Math.floor(10000 + Math.random() * 9000)}`;
            console.log(clave_temporal);

            let notificacionTemp = {
                numero_cuenta: numeroCuenta,
                correo_electronico: clientes[i].correo_electronico,
                nombres: clientes[i].nombres,
                clave_temporal: clave_temporal,
                registrado: "true"
            };

            console.log(notificacionTemp);

            let notificacionTempJson = JSON.stringify(notificacionTemp);

            fetch('http://localhost:4040/notificarNuevaCuenta', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: notificacionTempJson,
            });
        }
    }

}

function salir(){
    localStorage.setItem("data", "");
    location.href="index.html";
}