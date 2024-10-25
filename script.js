
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

const contenedor = document.getElementById('contenedor-productos'); //DIV CONTENEDOR DE LOS PRODUCTOS
const gridProducto = document.createElement('div');
gridProducto.classList.add('productos'); //DIV CON GRID 

function mostrarProductos() {
    productos.forEach(producto => {

        const divProducto = document.createElement('div'); //TARJETA DE LOS PRODUCTOS
        divProducto.classList.add('producto');

        divProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <button>Ver Producto</button>
        `;
        gridProducto.appendChild(divProducto);
    });
    contenedor.appendChild(gridProducto);
}

mostrarProductos();

