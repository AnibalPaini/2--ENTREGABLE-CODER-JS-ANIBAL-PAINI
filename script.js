//MENU HAMBURGUESA  --HECHO EN EL CURSO DE DESARROLLO WEB
const hamburguesa= document.querySelector('.header__menu')
hamburguesa.onclick=function(){
    navBar= document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
    hamburguesa.classList.toggle("active");
}

const cantidadCarrito=document.getElementById("cantidad-carrito");
const contenedorProducto = document.getElementById('contenedor-productos'); // DIV CONTENEDOR DE LOS PRODUCTOS
const gridProducto = document.createElement('div');
const carritoContenedor = document.getElementById('carrito-contenedor');
gridProducto.classList.add('productos'); // DIV CON GRID 

let carrito = []; // LISTA PARA GUARDAR LOS PRODUCTOS

// CARGAMOS EL CARRITO DESDE EL LOCALSTORAGE CUANDO SE RECARGA LA PAG
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito(); 
    }
}

fetch("./data.json") //Mostramos los productos
.then(response=> response.json())
.then(productos => {
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        
        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;
        
        divProducto.querySelector('button').addEventListener('click', () => agregarAlCarrito(producto)); //EVENTO DE AÑADIR PRODUCTO AL CARRITO
        gridProducto.appendChild(divProducto);
    });
    contenedorProducto.appendChild(gridProducto);
})
.catch(error=>console.log("No se encontraron los productos.", error));

function agregarAlCarrito(producto) { // FUNCIONALIDAD AGREGAR PRODUCTO AL CARRITO
    const itemEnCarrito = carrito.find(item => item.nombre === producto.nombre);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++; // SI YA ESTA AUMENTA LA CANTIDAD
    } else {
        carrito.push({ ...producto, cantidad: 1 }); // SINO AGREGA UN NUEVO PRODUCTO
    }

    if (carritoContenedor.classList.contains('oculto')) {
        Swal.fire({
            customClass: {
                popup: 'alerta-position'
            },
            html:`
                <div class="alerta-producto">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="alerta-img">
                    <div class="alerta-texto">
                        <span>${producto.nombre}</span>
                        <span>Se agrego al carrito! </span>
                    </div>
                </div>
            `,
            background:"#F2F3F4",
            showConfirmButton: false,
            timer: 1500,
            backdrop:false,
            width:400,
    
        });
    }

    actualizarCarrito();
}

function actualizarCarrito() { //ACTUALIZAMOS EL CARRITO
    const contenedorCarrito = document.getElementById('carrito');
    contenedorCarrito.innerHTML = ``; 

    const divHeaderCarrito=document.createElement(`div`);
    divHeaderCarrito.classList.add(`headerCarrito`);

    const cerrarCarrito=document.createElement(`p`);
    cerrarCarrito.textContent=`X`;
    cerrarCarrito.classList.add(`cerrar-carrito`)
    divHeaderCarrito.appendChild(cerrarCarrito);

    cerrarCarrito.addEventListener("click",()=>{
        carritoContenedor.classList.toggle('oculto'); 
    });

    const tituloCarrito=document.createElement("h2");
    tituloCarrito.textContent=`Mi carrito`;
    tituloCarrito.classList.add(`titulo-carrito`);
    divHeaderCarrito.appendChild(tituloCarrito);
    

    contenedorCarrito.appendChild(divHeaderCarrito)
    
    carrito.forEach((producto, index) => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto-carrito');

        //CREAMOS EL HTML DE LOS PRODUCTOS DENTRO DEL CARRITO
        divProducto.innerHTML = ` 
            <div class="producto-img">
                <img src="${producto.imagen}"> 
            </div>
            <div class="producto-descripcion">
                <p>${producto.nombre} (x${producto.cantidad})</p>
                <div class="producto-botones">
                    <button class="eliminar-producto">-</button>
                    <p class="cantidad--producto">${producto.cantidad}</p>
                    <button class="sumar-producto">+</button>
                </div>
            </div>
            <div class="producto-precio"><p>$${producto.precio * producto.cantidad}</p></div>
        `;
        //CREAMOS EL BOTON ELIMINAR PRODUCTO
        const botonEliminar = divProducto.querySelector('.eliminar-producto');
        botonEliminar.addEventListener('click', () => eliminarProducto(index));
        const botonSumar = divProducto.querySelector('.sumar-producto');
        botonSumar.addEventListener('click', () => {
            carrito[index].cantidad++; 
            actualizarCarrito(); 
        });
        contenedorCarrito.appendChild(divProducto);
    });

    // CREAMOS Y MOSTRAMOS EL TOTAL DE LOS PRODUCTOS
    const total = carrito.reduce((acu, item) => acu + item.precio * item.cantidad, 0);
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('carrito-total');
    totalDiv.innerHTML = `
                        <div>
                            <p>Subtotal</p>    
                        </div>
                        <div>
                            <span>$${total}</span>    
                        </div>
                        `;
    contenedorCarrito.appendChild(totalDiv);

    //LINEA SEPARADORA
    const linea=document.createElement('div');
    linea.classList.add("linea");
    contenedorCarrito.appendChild(linea);

    // CREAMOS EL BOTON VACIAR CARRITO
    const divBtnVaciar= document.createElement('div');
    divBtnVaciar.classList.add("btn-vaciar")
    divBtnVaciar.innerHTML=`<button>VACIAR CARRITO</button>`
    divBtnVaciar.addEventListener('click', vaciarCarrito);
    contenedorCarrito.appendChild(divBtnVaciar);

    //CREAMOS BOTON FINALIZAR COMPRA
    const divBtnComprar= document.createElement('div');
    divBtnComprar.classList.add("btn-comprar")
    divBtnComprar.innerHTML=`<button>REALIZAR COMPRA</button>`
    divBtnComprar.addEventListener('click', finalizarCompra);
    contenedorCarrito.appendChild(divBtnComprar);
    
    guardarCarritoEnLocalStorage(); 
}

function finalizarCompra(){
    if(carrito.length!=0){
        Swal.fire({
            title: "Compra realizada!",
            text: "Gracias por comprar en Materos!",
            icon: "success",
        });
        vaciarCarrito();
    }
}

function eliminarProducto(index) { //ELIMINAMOS LOS PRODUCTOS CON EL -, REDUCE LA CANTIDAD Y CUANDO LLEGA A 0 SE ELIMINA.
    carrito[index].cantidad--; 

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito(); 
}

function sumarProducto(index) { //SUMAR PRODUCTOS
    carrito[index].cantidad++; 
    actualizarCarrito(); 
}

function vaciarCarrito() { //VACIAMOS LA LISTA DEL CARRITO PARA CUNADO EL BOTON VACIAR CARRITO SEA ACTIVADO
    carrito = []; 
    actualizarCarrito(); 
    guardarCarritoEnLocalStorage(); 
}

const abrirCarrito = document.querySelector(".abrir"); // FUNCIONALIDAD PARA ABRIR
abrirCarrito.addEventListener("click", function() {
    carritoContenedor.classList.toggle('oculto'); 
});

// LOCAL STORAGE
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito)); //CONVERTIMOS EN STRING EL CARRITO Y LO GUARDAMOS EN LOCAL STORAGE
}

// CUANDO CARGA LA PAG SE RECUPERA EL CARRITO DEL LOCALSTORAGE
cargarCarritoDesdeLocalStorage();







