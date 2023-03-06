const formIngreso = document.getElementById("form-ingreso");
const formTransaccion = document.getElementById("form-transaccion");

let ingreso;
let divCliente = document.querySelector("#agregarCliente");
let divNoCliente = document.querySelector("#noCliente");
let cliente;

formTransaccion.style.display = "none";

function infoCliente(data){
    cliente =  {
        "numero_cedula": data[0].numero_cedula,
        "nombres": data[0].nombres,
        "apellidos": data[0].apellidos,
        "fecha_nacimiento": data[0].fecha_nacimiento,
        "numero_telefono": data[0].numero_telefono,
        "correo_electronico": data[0].correo_electronico,
        "ciudad_residencia": data[0].ciudad_residencia,
        "direccion_domicilio": data[0].direccion_domicilio,
        "situacion_laboral": data[0].situacion_laboral,
        "estado_financiero": data[0].estado_financiero,
        "usuario": data[0].usuario,
        "clave": data[0].clave,
        "estado_cliente": data[0].estado_cliente
    }
};

function cargarCliente(cliente){
    //console.log(cliente);
    divNoCliente.innerHTML = "";
    divCliente.innerHTML = "";
    let nombres = document.createElement("h5");
    nombres.innerHTML=("<b>Nombre Titular: </b>" + cliente[0].nombres + " " + cliente[0].apellidos);
    divCliente.append(nombres);

    clienteCedula = cliente[0].numero_cedula;
    let numero_cedula = document.createElement("h5");
    numero_cedula.innerHTML=(clienteCedula);
    divCliente.append(numero_cedula);
    formTransaccion.style.display = "";
}

function noCliente(){
    divCliente.innerHTML = "";
    divNoCliente.innerHTML = "";
    let mensaje = document.createElement("h6");
    mensaje.innerHTML=("El cliente no está registrado en FinanPoli");
    divNoCliente.append(mensaje);
    formTransaccion.style.display = "none";
    
}


formIngreso.addEventListener("submit", function(event){
    event.preventDefault();

    let cedula_cliente = document.querySelector("#clienteUsuario").value;
    let password = document.querySelector("#clienteClave").value;

    console.log(cedula_cliente + " " + password);

    let ruta = "http://localhost:4040/cliente/" + cedula_cliente;

    fetch(ruta)
    .then(res => res.json())
    .then(data =>{
        if(data.message == "El cliente no está registrado en FinanPoli" || password != ("admin"+cedula_cliente)){
            alert("usuario o contraseña invalidos")
            noCliente();
        } else {
            cargarCliente(data)
            infoCliente(data)
        }
        
    })
    .catch(error => console.log(error))

})

formTransaccion.addEventListener("submit", function(event){
    event.preventDefault();


})