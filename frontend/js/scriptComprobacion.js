'use strict'

const form = document.getElementById("formulario");

form.addEventListener("submit", function(event){ 
    event.preventDefault();

    let loginData = new FormData(form);
    let cedula_cliente = document.querySelector("#Cedula").value;

    let ruta = "http://localhost:4040/cliente/" + cedula_cliente;
    console.log(ruta);
    fetch(ruta)
    .then(res => res.json())
    .then(data =>{ 
        if(data.message == "El cliente no está registrado en FinanPoli"){
            swal({
                title: "Oops!",
                text: "El usuario no se encuentra registrado en FinanPoli",
                icon: "error",
            })
            //alert("El usuario no se encuentra registrado en FinanPoli");
        } else {
            if(data[0].usuario == ""){
                let dataJson = JSON.stringify(data[0]);
                console.log(typeof(dataJson));
                if(data[0].clave == loginData.get('clave')){
                    console.log('si puedes continuar');
                    localStorage.setItem("data", JSON.stringify(data[0].numero_cedula));
                    location.href='creacionUsuarioClave.html'
                    //form.submit();
                } else {
                    swal({
                        title: "Oops!",
                        text: "La clave ingresada es incorrecta",
                        icon: "error",
                        button: "Intenter nuevamente"
                    })
                    
                    //alert('La clave ingresada es incorrecta');
                }

            } else {
                swal({
                    title: "Caution!",
                    text: "Ya tienes creado un usuario y una clave",
                    icon: "warning",
                    button: "Entiendo"
                })
                //alert('ya tienes creado un usuario y clave')
            }
        }
        
    })
    .catch(error => console.log(error))
});

function salir(){
    localStorage.setItem("data", "");
    location.href="index.html";
}