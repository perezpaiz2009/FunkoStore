const carrito = document.querySelector('#carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#lista-productos');
let articulosCarrito = [];


cargarEventListeners();


function cargarEventListeners() {

    listaProductos.addEventListener('click', agregarFunko);

    //Elimina funkos el carito
    carrito.addEventListener('click', eliminarFunko);





}


vaciarCarrito.addEventListener('click', () => {

    articulosCarrito = [];
    limpiarHTML();

});


//funciones

function agregarFunko(e) {
    //delegation
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement;
        leerHtmlProduct(productoSeleccionado);

    }

}

//Eliminar funko del carrito
function eliminarFunko(e) {
    if (e.target.classList.contains('borrar-curso')) {

        const productoId = e.target.getAttribute('data-id');
        //Eliminando de articulos carrito
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId)

        carHTML(); //renderizar de nuevo el HTML
    }


}

//Leyendo HTML del producto

function leerHtmlProduct(producto) {

    //Crear objeto del producto
    const infoProduct = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('.producto__nombre').textContent,
        precio: producto.querySelector('.producto__precio').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    //revisar si existe elemento en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProduct.id);
    if (existe) {
        //Actualizamos la cantidad
        const funkos = articulosCarrito.map(producto => {
            if (producto.id === infoProduct.id) {
                producto.cantidad++;
                return producto; //actualiza prod

            } else {

                return producto; //retorna los no duplicados
            }

        });

        articulosCarrito = [...funkos];

    } else {
        //agregando elementos al array
        articulosCarrito = [...articulosCarrito, infoProduct];
    }



    console.log(articulosCarrito);
    carHTML();
}

//Renderizar HTML del carrito   
function carHTML() {
    //Limpiar HTML
    limpiarHTML();

    articulosCarrito.forEach(funko => {

        //Destructuring
        const {
            imagen,
            nombre,
            precio,
            cantidad,
            id
        } = funko;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
        <img src="${imagen}" class="tamañoimgcarrito">
            </td>
            <td>       
            ${nombre}
            </td>
            <td>
            ${precio}
            </td>
            <td>
            ${cantidad}
            </td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>

         
              `;

        //Se agrega HTML a Tabla
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    /*
    contenedorCarrito.innerHTML = ''; */

    //forma mas rapida segun para el navegador
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }


}