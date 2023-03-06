
// Inicio funcionalidad del login.html
const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

// Fin funcionalidad del login.html

const form = document.getElementById("form-login");
let loginData;
let clienteData;

form.addEventListener("submit", function(event){
    event.preventDefault();
    
    loginData = new FormData(form);

    fetch(('http://localhost:4040/clienteUsuario/' + loginData.get('usuario')), {
        method:'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.message == 'El cliente no está registrado en FinanPoli o no ha creado un Usuario y clave'){
            console.log('No tiene cuenta bro');
            swal({
                title: "Oops!",
                text: "Usuario o contraseña incorrectos, por favor intentelo de nuevo",
                icon: "error",
                button: true,
            })

            //alert('usuario o contraseña incorrectos, por favor intentelo de nuevo')
        } else {
            //console.log('SI esta registrado bro')
            //console.log(data[0].clave);
            if(loginData.get('password') == data[0].clave){
                //console.log('ingrese a la banca web bro');
                localStorage.setItem("data", JSON.stringify(data[0].numero_cedula));
                location.href="bancaProductos.html";
            } else {
                swal({
                    title: "Oops!",
                    text: "Usuario o contraseña incorrectos, por favor intentelo de nuevo",
                    icon: "error",
                    button: true,
                })
                //console.log('usuario o contraseña incorrectos bro');
            }
        }
    })
    .catch(error => console.log(error));
});

function inicioAdmin(){
    loginData = new FormData(form);
    if((loginData.get("usuario") == "admin") && loginData.get("password") == "P@ssw0rd"){
        location.href="creacionClientes.html"
    } else {
        console.log(loginData);
        swal({
            title: "Oops!",
            text: "Usuario o contraseña incorrectos",
            icon: "error",
            button: true,
        })
    }
}