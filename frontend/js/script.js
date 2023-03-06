const form = document.getElementById("form-clientes");

let cliente;

function btnContinuar(){
    console.log(cliente.numero_cedula)
    let codigo = document.querySelector("#inputCodigo").value;
    console.log(codigo)
    console.log(cliente.clave)

    let codigoSMS = document.querySelector("#inputCodigoSMS").value;
    console.log(codigoSMS)
    console.log(cliente.usuario)

    if(codigo == cliente.clave && codigoSMS == cliente.usuario){

        cliente.clave = "";
        cliente.usuario = "";
        clienteJson = JSON.stringify(cliente);

        fetch("http://localhost:4040/cliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: clienteJson,
        })
        .then(res => {
            if(res.ok) {
                //location.reload();
                // swal ( "Correct!" ,  "Cliente ingresado con exito" ,  "success" )
                // .then(location.reload());

                swal({
                    title: "Genial!",
                    text: "Cliente ingresado con exito",
                    icon: "success",
                    button: true,
                    closeOnClickOutside: false,
                })
                .then(continuar => {
                    if(continuar){
                        location.reload();
                    }
                })
                //alert("Cliente ingresado con exito")
            } else {
                //console.log(res);
                //JSON.stringify(res);
                //alert("Algo salio mal, vuelva a intentarlo");
                swal ( "Oops" ,  "Algo salió mal!" ,  "error" )
                location.reload();
            }
        })

    } else {
        swal({
            title: "Oops",
            text: "Parece que el código ingresdo no es correcto, ¿Deseas intentarlo nuevamente?",
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
        .then((continuar) => {
            if(!continuar){
                location.reload();
            }
        })
        // let cancelar = confirm("Código incorrecto, ¿Desea intentarlo nuevamente?")
        // if(!cancelar){
        //     location.reload();
        // }
    }
}

function validar() {

    var divValidacion = document.querySelector("#validacion");
    let validacion = document.createElement("h5");
    validacion.innerHTML=("Valida el correo electrónico para continuar con el registro")
    validacion.style.cssText = "color: #6a2e37; background: #ecced0; display: flex; justify-content: center; align-items: center; height: 50px;";
    divValidacion.append(validacion);

    let ingresar = document.createElement("input");
    ingresar.setAttribute("id", "inputCodigo");
    divValidacion.append(ingresar);

    let validacionSMS = document.createElement("h5");
    validacionSMS.innerHTML=("Valida el número telefónico para continuar con el registro")
    validacionSMS.style.cssText = "color: #6a2e37; background: #ecced0; display: flex; justify-content: center; align-items: center; height: 50px;";
    divValidacion.append(validacionSMS);

    let ingresarSMS = document.createElement("input");
    ingresarSMS.setAttribute("id", "inputCodigoSMS");
    divValidacion.append(ingresarSMS);
    
    let continuar = document.createElement("button");
    continuar.innerHTML=("Continuar");
    continuar.style.cssText = "background: #2a7c6e; margin-top: 30px; color:white;";
    continuar.setAttribute("class", "mx-auto");
    continuar.setAttribute("onclick", "btnContinuar();");
    divValidacion.append(continuar);

    form.style.display = "none";

    fetch("http://localhost:4040/verificar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });

    fetch("http://localhost:4040/verificarSMS", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cliente)
    });
}


form.addEventListener("submit", function (event){
    event.preventDefault();
    let clienteData = new FormData(form);
    //let nombreCliente = clienteData.get("nombreCliente")
    let sinValor = "";

    const otp = `${Math.floor(1000 + Math.random() * 900)}`;
    console.log(otp);

    const otpSMS = `${Math.floor(1000 + Math.random() * 900)}`;
    console.log(otp);

    if(otp == otpSMS){
        otpSMS+=100;
    }

    cliente = {
        numero_cedula: clienteData.get("clienteCedula"),
        nombres: clienteData.get("clienteNombres"),
        apellidos: clienteData.get("clienteApellidos"),
        fecha_nacimiento: clienteData.get("clienteFecha"),
        numero_telefono: clienteData.get("clienteTelefono"),
        correo_electronico: clienteData.get("clienteEmail"),
        ciudad_residencia: clienteData.get("clienteCiudad"),
        direccion_domicilio: clienteData.get("clienteDireccion"),
        situacion_laboral: clienteData.get("clienteLaboral"),
        estado_financiero: clienteData.get("clienteFinanciero"),
        usuario: otpSMS,
        clave: otp,
        estado_cliente: "Activo" 
    };

    console.log(cliente);

    let numero_cedula = clienteData.get("clienteCedula");
    //console.log(typeof(numero_cedula))
    //let clienteJson = JSON.stringify(cliente);
    //let validar;
    //console.log(clienteJson);

    let ruta = "http://localhost:4040/cliente/" + numero_cedula;
    console.log(ruta);

    fetch(ruta)
    .then(res => {
        if(res.ok) {
            //console.log(res);
            //JSON.stringify(res);
            // alert("El cliente ya se encuentra registrado en FinanPoli");
            swal ( "Oops" ,  "El cliente ya se encuentra registrado en FinanPoli" ,  "error" )
            var clienteCedula = document.getElementById("clienteCedula");
            clienteCedula.style.cssText = 'border-color: red';
            //validarCorreo();
            
        } else {
            //alert("Cliente ingresado con exito")
            //form.reset();
            validar();
        }
    })
    // .then(data => {
    //     console.log(data);
    //     JSON.stringify(data);
    //     alert(data.message);
    // });
    //.then(data => console.log(data))
});

function salir(){
    localStorage.setItem("data", "");
    location.href="index.html";
}