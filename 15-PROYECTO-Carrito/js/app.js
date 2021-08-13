//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Al dar cli "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML(); //eliminamos todo en html
    })
}


//funciones
function agregarCurso(e) {
    e.preventDefault();//para evitar que la pagina suba
    if(e.target.classList.contains('agregar-carrito')){ //para solo seleccionar el boton al carrito
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
    

    //eliminar del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

    carritoHTML();//Iterar sobre el carrito y mostrar su HTML
    }
}

// lee el contenido del HTML al que le dimos clic y extrae la informacipon del curso
function leerDatosCurso(curso) {
    //console.log(curso);

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src, //extrar la imagen del curso
        titulo: curso.querySelector('h4').textContent, //titulo del curso
        precio: curso.querySelector('.precio span').textContent, //precio
        id: curso.querySelector('a').getAttribute('data-id'), //el id del curso
        cantidad: 1
    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id ) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna los objetos que no son actualizados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);

    carritoHTML();//manda a llamar el carrito
}

//muestra el carrito de compras en el HTML

function carritoHTML() { //para crear la tabla en el carrito

    //limpiar el HTML
    limpiarHTML();

    //Agrega el HTML del carrito en el tbody


    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id} = curso; //objeto 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">  X  </a>
            </td>
        `;

        //agrega el contenedor del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

//elimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild); 
    }
}