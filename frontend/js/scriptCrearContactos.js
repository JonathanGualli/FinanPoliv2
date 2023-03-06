'use strict'

let data = localStorage.getItem("data");
let clienteData;
let cuentasData;
let contactosData;
let contactoSeleccionado;

const form= document.getElementById("formAgregarContacto");


fetch(('http://localhost:4040/cliente/'+ data.substring(1,11)))
.then(res => res.json())
.then(data => {
    clienteData = data[0];

    fetch('http://localhost:4040/clienteCuentas/' + data[0].numero_cedula)
    .then(res => res.json())
    .then(dataCuenta => {
        cuentasData = dataCuenta;

        fetch('http://localhost:4040/clienteContacto/' + clienteData.numero_cedula)
        .then(res => res.json())
        .then(dataContactos => {
            if(dataContactos.message == 'El cliente no tiene agregado ningún contacto'){
                contactosData= new Array();
            } else {
                contactosData = dataContactos;
            }
            
            colocarNombre();
            colocarContactos();
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

function colocarContactos(){
    let divColocarContacto = document.querySelector("#colocarContacto");
    
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

        let a = document.createElement("a");
        a.setAttribute("onclick", "seleccionarContacto(" + contactosData[i].numero_identificacion + ", " + contactosData[i].numero_cuenta + ")");
        divColocarContacto.append(a);

        let div1 = document.createElement("div");
        div1.setAttribute("class", "row mx-auto");
        div1.setAttribute("style", "border-bottom: 1px solid #666; margin-bottom: 10px")
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
        p3.setAttribute("style", "margin-bottom: 2px; font-size: 0.9rem; color: #666;");
        p3.innerHTML=(contactosData[i].numero_cuenta);
        div3.append(p3);
    }
}

function seleccionarContacto (numero_identificacion, numero_cuenta){

    contactoSeleccionado = contactosData.find(element => ((element.numero_identificacion ==  numero_identificacion) && (element.numero_cuenta == numero_cuenta)));

    form.setAttribute("style", "display: none")

    let infoContacto = document.querySelector("#infoContacto");
    infoContacto.setAttribute("style", "display: ")

    let nombre = document.getElementById("infoNombre");
    nombre.innerHTML=contactoSeleccionado.nombre_contacto;

    let numeroIdentificacion = document.getElementById("infoNumeroIdentificacion");
    numeroIdentificacion.innerHTML=contactoSeleccionado.numero_identificacion;
    
    let nombreBanco = document.getElementById("infoNombreBanco");
    nombreBanco.innerHTML=contactoSeleccionado.banco;

    let tipoCuenta = document.getElementById("infoTipoCuenta"); 
    tipoCuenta.innerHTML=contactoSeleccionado.tipo_cuenta;
    
    let numeroCuenta = document.getElementById("infoNumeroCuenta");
    numeroCuenta.innerHTML=contactoSeleccionado.numero_cuenta;

}

function agregarContacto (){
    let infoContacto = document.querySelector("#infoContacto");
    infoContacto.setAttribute("style", "display: none")
    form.setAttribute("style", "display: ''")
}

form.addEventListener("submit", function(event){
    event.preventDefault();
    let contactoData = new FormData(form);
    let contacto = {
        numero_identificacion: contactoData.get("benCedula"),
        numero_cuenta: contactoData.get("benNumeroCuenta"),
        nombre_contacto: contactoData.get("benNombres"),
        banco: contactoData.get("benBanco"),
        tipo_cuenta: contactoData.get("benTipoCuenta"),
        numero_cedula: clienteData.numero_cedula
    }

    let contactoJson = JSON.stringify(contacto);

    
    if(contactosData.find(element => (element.numero_identificacion == contacto.numero_identificacion && element.numero_cuenta == contacto.numero_cuenta)) == undefined){
        console.log("no sotoy we")
        fetch('http://localhost:4040/cuenta/' + contactoData.get("benNumeroCuenta"))
        .then(res => res.json())
        .then(data => {
    
            if(data.message == 'La cuenta no existe en FinanPoli'){
                swal({
                    title: "Oops!",
                    text: "La cuenta ingresada no existe en FinanPoli",
                    icon: "error",
                    button: "Intenter con otra cuenta"
                })
                //alert("La cuenta ingresada no existe en finanpoli");
            } else {
                if(contactoData.get("benTipoCuenta") == data[0].tipo_cuenta){
                    fetch('http://localhost:4040/clienteCuentas/' + contactoData.get("benCedula"))
                    .then(res => res.json())
                    .then(data => {
                        let cuentaSeleccionada = data;
                        let cuenta = cuentaSeleccionada.find(element => (element.numero_cuenta == contactoData.get("benNumeroCuenta")));
                        if(cuenta == undefined){
                            swal({
                                title: "Oops!",
                                text: "Tu contacto no dispone de dicha cuenta",
                                icon: "error",
                                button: "Intenter nuevamente"
                            })
                            //alert("Tu contacto no dispone de dicha cuenta")
                        } else {
                            fetch('http://localhost:4040/contacto', {
                                method: 'POST',
                                headers: {
                                    "Content-Type": "application/json"
                                }, 
                                body: contactoJson,
                            })
                            .then(res => {
                                if(res.ok){
                                    swal({
                                        title: "Genial!",
                                        text: "Contacto ingresado con éxito",
                                        icon: "success",
                                        button: true,
                                    })
                                    .then(continuar => {
                                        if(continuar){
                                            location.reload();
                                        }
                                    })
                                    // alert('Contacto ingresado con éxito')
                                    // location.reload();
                                } else {
                                    swal({
                                        title: "Oops!",
                                        text: "Algo salió mal, vuelve a intentarlo",
                                        icon: "error",
                                    })
                                    //alert('Algo salió mal, vuelve a intentarlo')
                                }
                            })
                        }
                        
                    })
                } else {
                    swal({
                        title: "Oops!",
                        text: "Tu contacto no dispone de dicha cuenta",
                        icon: "error",
                        button: "Intenter nuevamente"
                    })
                    //alert("Tu contacto no dispone de dicha cuenta");
                }
            }
        })
    } else {
        console.log("me repeti we")
        swal({
            title: "Caution!",
            text: "Ya existe este beneficiario en tu lista de contactos",
            icon: "warning",
            button: "Intenter nuevamente"
        })
        //alert("Ya existe este beneficiario en tu lista de contactos")
        
    }

    //console.log(contactoJson)

    // let clienteSeleccionado = cuentasData.find(element => element.numero_cuenta == contacto.numero_cuenta)
    // let numero_cuenta_seleccionada;

    // if(clienteSeleccionado == undefined){
    //     numero_cuenta_seleccionada = " ";
    // } else {
    //     numero_cuenta_seleccionada = clienteSeleccionado.numero_cuenta;
    // } 

    // if(contacto.numero_identificacion == clienteData.numero_cedula && contactoData.numero_cuenta == numero_cuenta_seleccionada){
    //     console.log("");
    // }

});

// 

const Opcionbanco = document.querySelector("#benBanco");

const opcionCambiada = () =>{
    
    let cedula = document.querySelector("#benCedula");
    let nombres = document.querySelector("#benNombres");
    let tipoCuenta = document.querySelector("#benTipoCuenta");
    let numeroCuenta = document.querySelector("#benNumeroCuenta");
    let btnAceptar = document.querySelector("#agregarContacto");
    let divInfoCuentaContacto = document.querySelector("#infoCuentaContacto");
    let btnValidarContactoCedula = document.querySelector("#validarContactoCedula");

    if(document.querySelector("#benBanco").value == "FinanPoli"){
        cedula.removeAttribute("disabled")
        btnValidarContactoCedula.removeAttribute("disabled");
        // nombres.removeAttribute("disabled")
        // tipoCuenta.removeAttribute("disabled")
        // numeroCuenta.removeAttribute("disabled")

    } else {
        divInfoCuentaContacto.setAttribute("style", "display: none");
        btnValidarContactoCedula.setAttribute("disabled", "")
        cedula.setAttribute("disabled", "")
        nombres.setAttribute("disabled", "")
        nombres.setAttribute("value", " ")
        tipoCuenta.setAttribute("disabled", "")
        numeroCuenta.setAttribute("disabled", "")
        btnAceptar.setAttribute("disabled", "")
    }
}

Opcionbanco.addEventListener("change", opcionCambiada);

function validarContacto(){
    
    let btnAceptar = document.querySelector("#agregarContacto");
    let identificadorContacto = document.querySelector("#benNombres");
    let tipoCuenta = document.querySelector("#benTipoCuenta");
    let numeroCuenta = document.querySelector("#benNumeroCuenta");
    let divInfoCuentaContacto = document.querySelector("#infoCuentaContacto");

    let ruta = ('http://localhost:4040/cliente/' + document.querySelector("#benCedula").value);
    console.log(ruta);
    fetch(ruta)
    .then(res => res.json())
    .then(data => {
        if(data.message == "El cliente no está registrado en FinanPoli"){
            identificadorContacto.setAttribute("value", "El cliente no se encuentra registrado en FinanPoli")
        } else {
            input.addEventListener('input', escucharCedula);
            let nombres = data[0].nombres + " " + data[0].apellidos;
            divInfoCuentaContacto.setAttribute("style", "");
            identificadorContacto.setAttribute("value", nombres);
            identificadorContacto.removeAttribute("disabled");
            tipoCuenta.removeAttribute("disabled");
            numeroCuenta.removeAttribute("disabled");
            btnAceptar.removeAttribute("disabled")
        }
    })
}

const input = document.querySelector("#benCedula");

function escucharCedula(e){
    
    let divInfoCuentaContacto = document.querySelector("#infoCuentaContacto");
    let btnAceptar = document.querySelector("#agregarContacto");
    let nombres = document.querySelector("#benNombres");
    let tipoCuenta = document.querySelector("#benTipoCuenta");
    let numeroCuenta = document.querySelector("#benNumeroCuenta");

    divInfoCuentaContacto.setAttribute("style", "display: none");
    nombres.setAttribute("disabled", "");
    nombres.setAttribute("value", " ")
    tipoCuenta.setAttribute("disabled", "");
    numeroCuenta.setAttribute("disabled", "");
    btnAceptar.setAttribute("disabled", "");

}
