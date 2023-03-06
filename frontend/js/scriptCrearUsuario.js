'use strcit'

let data = localStorage.getItem("data");
//localStorage.setItem("data", "");

let usuarioData;

const form = document.getElementById("form-usuario");

form.addEventListener("submit", function(event){ 
    event.preventDefault();

    usuarioData = new FormData(form);    
    
    validarUsuario();

});

function validarUsuario (){
    fetch('http://localhost:4040/clienteUsuario/' + usuarioData.get("usuario"))
    .then(res => res.json())
    .then(data => {
        if(data.message == 'El cliente no está registrado en FinanPoli o no ha creado un Usuario y clave'){
            validarContraseñas();
        } else {
            swal({
                title: "Oops!",
                text: "El usuario ya e encuentra en uso, por favor ingresa uno diferente",
                icon: "error",
                button: "Intenter nuevamente"
            })
            //alert('El usuario ya se encuentra en uso, por favor ingrese uno diferente')
        }
    });
}

function validarContraseñas(){
    if(usuarioData.get("clave") === usuarioData.get("confirmacionClave")){
        let ruta = ("http://localhost:4040/cliente/" + data.substring(1,11));
        fetch(ruta)
        .then(res => res.json())
        .then(data => {
            data[0].usuario = usuarioData.get("usuario");
            data[0].clave = usuarioData.get("clave");

            fetch(('http://localhost:4040/cliente/' + data[0].numero_cedula), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: (JSON.stringify(data[0])),
            })
            .then(res => {
                if(res.ok){
                    swal({
                        title: "Genial!",
                        text: "Usuario y clave creados con exito. Ahora puedes ingresar a la banca web",
                        icon: "success",
                        button: true,
                    })
                    .then(continuar => {
                        if(continuar){
                            location.href="login.html"
                        }
                    })
                    // alert("Usuario y Clave creados con exito. Ahora puedes ingresar a la banca web");
                    // location.href="login.html"
                    //form.submit();
                } else {
                    swal({
                        title: "Oops!",
                        text: "Algo salió mal, vuelve a intentarlo",
                        icon: "error",
                        button: "Intenter nuevamente"
                    })
                    //alert("Algo salió mal, vuele a intentarlo")
                }
            });
        })
        .catch(error => console.log(error));

    } else {
        swal({
            title: "Oops!",
            text: "La clave ingresada no coincide",
            icon: "error",
            button: "Intenter nuevamente"
        })
        //alert('La clave ingresada no concide')
    }
}

function salir(){
    localStorage.setItem("data", "");
    location.href="index.html";
}