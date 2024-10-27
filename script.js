
//MENU HAMBURGUESA  --HECHO EN EL CURSO DE DESARROLLO WEB
const hamburguesa= document.querySelector('.header__menu')
hamburguesa.onclick=function(){
    navBar= document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
    hamburguesa.classList.toggle("active");
}

const productos = [ //CREO LA LISTA DE LOS PRODUCTOS QUE VOY A MOSTRAR
    {
        nombre: "Mate Calabaza Tradicional",
        precio: 1200,
        imagen: "../img/destacado1.jpeg"
    },
    {
        nombre: "Yerba Mate Orgánica",
        precio: 800,
        imagen: "../img/destacado2.jpg"
    },
    {
        nombre: "Bombilla Acero Inoxidable",
        precio: 450,
        imagen: "../img/destacado3.jpg"
    },
    {
        nombre: "Termo Acero 1 Litro",
        precio: 3000,
        imagen: "../img/destacado4.jpg"
    },
    {
        nombre: "Set Matero Completo",
        precio: 5000,
        imagen: "../img/destacado5.jpg"
    },
    {
        nombre: "Porta Mate y Bombilla",
        precio: 1500,
        imagen: "../img/destacado6.jpg"
    },
    {
        nombre: "Yerba Mate Tradicional",
        precio: 700,
        imagen: "../img/yerba1.jpg"
    },
    {
        nombre: "Yerba Mate Suave",
        precio: 750,
        imagen: "../img/yerba2.jpeg"
    },
    {
        nombre: "Yerba Mate con Hierbas",
        precio: 850,
        imagen: "../img/yerba3.jpeg"
    },
    {
        nombre: "Bombilla Dorada Clásica",
        precio: 400,
        imagen: "../img/bombilla1.jpeg"
    },
    {
        nombre: "Bombilla de Aluminio",
        precio: 350,
        imagen: "../img/bombilla2.jpeg"
    },
    {
        nombre: "Bombilla Plateada",
        precio: 500,
        imagen: "../img/bombilla4.jpeg"
    },
    {
        nombre: "Termo con Funda",
        precio: 3200,
        imagen: "./img/termo1.jpeg"
    },
    {
        nombre: "Termo de Acero 1.5 Litros",
        precio: 3500,
        imagen: "./img/termo2.jpeg"
    },
    {
        nombre: "Termo Especial",
        precio: 4000,
        imagen: "./img/termo4.jpeg"
    }
];

const contenedorProducto = document.getElementById('contenedor-productos'); // DIV CONTENEDOR DE LOS PRODUCTOS
const gridProducto = document.createElement('div');
gridProducto.classList.add('productos'); // DIV CON GRID 

let carrito = []; // Lista para guardar productos

// Cargar el carrito desde localStorage al inicio
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito(); 
    }
}

function agregarAlCarrito(producto) { // FUNCIONALIDAD AGREGAR PRODUCTO AL CARRITO
    const itemEnCarrito = carrito.find(item => item.nombre === producto.nombre);
    
    if (itemEnCarrito) {
        itemEnCarrito.cantidad++; // Incrementa la cantidad si ya está en el carrito
    } else {
        carrito.push({ ...producto, cantidad: 1 }); // Agrega nuevo producto
    }

    const carritoContenedor = document.getElementById('carrito-contenedor'); // SE ABRE EL CARRITO CADA VEZ QUE AGREGAMOS UN PRODUCTO
    carritoContenedor.classList.remove('oculto');

    actualizarCarrito();
}

function actualizarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    contenedorCarrito.innerHTML = `<h2>Carrito</h2>`; 
    
    carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.classList.add('producto-carrito');
        
        div.innerHTML = `
            <img src="${producto.imagen}">
            <p>${producto.nombre} (x${producto.cantidad})</p>
            <p>$${producto.precio * producto.cantidad}</p>
            <button class="eliminar-producto">-</button>
        `;
        const botonEliminar = div.querySelector('.eliminar-producto');
        botonEliminar.addEventListener('click', () => eliminarProducto(index));
        contenedorCarrito.appendChild(div);
    });

    // Agregar el precio total
    const total = carrito.reduce((acu, item) => acu + item.precio * item.cantidad, 0);
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<h4>Total: $${total}</h4>`;
    contenedorCarrito.appendChild(totalDiv);

    // Botón para vaciar el carrito
    const divBtnVaciar= document.createElement('div');
    divBtnVaciar.classList.add("btn-vaciar")
    divBtnVaciar.innerHTML=`<button>Vaciar Carrito</button>`
    divBtnVaciar.addEventListener('click', vaciarCarrito);
    contenedorCarrito.appendChild(divBtnVaciar);
    
    guardarCarritoEnLocalStorage(); 
}

function mostrarProductos() {
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        
        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        `;
        
        divProducto.querySelector('button').addEventListener('click', () => agregarAlCarrito(producto));
        gridProducto.appendChild(divProducto);
    });
    contenedorProducto.appendChild(gridProducto);
}

function eliminarProducto(index) { // ELIMINAMOS LOS PRODUCTOS CON LA X
    // Reducir la cantidad del producto
    carrito[index].cantidad--; 

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1); // Eliminar el producto si la cantidad es cero
    }

    actualizarCarrito(); // Actualizar el carrito después de la eliminación
}

function vaciarCarrito() {
    carrito = []; 
    actualizarCarrito(); 
    guardarCarritoEnLocalStorage(); 
}

const abrirCarrito = document.querySelector(".abrir"); // FUNCIONALIDAD PARA ABRIR Y CERRAR EL CARRITO
abrirCarrito.addEventListener("click", function() {
    const carritoContenedor = document.getElementById('carrito-contenedor');
    carritoContenedor.classList.toggle('oculto'); 
});

// LOCAL STORAGE
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Al cargar la página, recuperar el carrito del localStorage
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();
});



mostrarProductos(); // Mostrar productos en la página



