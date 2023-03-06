'use strict'

let data = localStorage.getItem("data");
let clienteData; 
let cuentasData;

fetch(('http://localhost:4040/cliente/'+ data.substring(1,11)))
.then(res => res.json())
.then(data => {
    clienteData = data[0];

    fetch('http://localhost:4040/clienteCuentas/' + data[0].numero_cedula)
    .then(res => res.json())
    .then(dataCuenta => {
        cuentasData = dataCuenta;
        colocarNombre();
        colocarProductos();
    });
})    

function colocarNombre() {
    let putNombre = document.querySelector('#nombreUsuario');
    putNombre.append(clienteData.nombres + ' ' + clienteData.apellidos);
}

function colocarProductos(){

    for(let i=0; i<cuentasData.length; i++){
        let ruta = 'http://localhost:4040/cuenta/' + cuentasData[i].numero_cuenta;
        console.log(ruta);
        fetch(ruta)
        .then(res => res.json())
        .then(cuenta => {
            console.log(cuenta[0]);

            let divProductos = document.querySelector("#productos");

            let div1 = document.createElement("div");
            div1.setAttribute("class", "col-md-6")
            div1.setAttribute("style", "margin-top: 70px")
            divProductos.append(div1);
        
            let tituloCuenta = document.createElement("h2");
            tituloCuenta.setAttribute("style", "color: #2a7c6e")
            let tipo_cuenta;
            if(cuenta[0].tipo_cuenta == "Corriente"){
                tipo_cuenta = "Cuenta Corriente"
            } else {
                tipo_cuenta = "Cuenta de Ahorros"
            }
            tituloCuenta.innerHTML=(tipo_cuenta);
            div1.append(tituloCuenta);
        
            let div2 = document.createElement("div");
            div2.setAttribute("class", "card");
            div2.setAttribute("style", "border-radius: 2px 10px 10px 40px;");
            div1.append(div2);
        
            let div3 = document.createElement("div");
            div3.setAttribute("class", "card-body");
            div2.append(div3);
        
            let cardTitle = document.createElement("h3");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.setAttribute("style", "border-bottom: 3px solid #38d39f");
            cardTitle.innerHTML=(cuenta[0].numero_cuenta);
            div3.append(cardTitle);

            let div4 = document.createElement("div");
            div4.setAttribute("class", "row");
            div3.append(div4);

            let div5 = document.createElement("div");
            div5.setAttribute("class", "col-6");
            div4.append(div5);

            let disponible = document.createElement("p");
            disponible.setAttribute("class", "text-start");
            disponible.innerHTML=("Disponible");
            div5.append(disponible);

            let div6 = document.createElement("div");
            div6.setAttribute("class", "col-6");
            div4.append(div6);

            let saldo = document.createElement("p");
            saldo.setAttribute("class", "text-end");
            saldo.setAttribute("style", "font-size: 1.5rem");
            saldo.innerHTML=(cuenta[0].saldo + " USD");
            div6.append(saldo);

            //ljhjkjk

            let div7 = document.createElement("div");
            div7.setAttribute("class", "row");
            div7.setAttribute("style", "margin-top: -20px");
            div3.append(div7);

            let div8 = document.createElement("div");
            div8.setAttribute("class", "col-6");
            div7.append(div8);

            let Estado = document.createElement("p");
            Estado.setAttribute("class", "text-start");
            Estado.innerHTML=("Estado");
            div8.append(Estado);

            let div9 = document.createElement("div");
            div9.setAttribute("class", "col-6");
            div7.append(div9);

            let estado = document.createElement("p");
            estado.setAttribute("class", "text-end");
            estado.setAttribute("style", "color: green");
            estado.innerHTML=(cuenta[0].estado);
            div9.append(estado);

        })
    }

}

function salir(){
    localStorage.setItem("data", "");
    location.href="index.html";
}