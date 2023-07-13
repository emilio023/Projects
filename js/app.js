const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCurso = document.querySelector('#lista-cursos')
let articulosCarrito = []

RegistrarEventListener()
function RegistrarEventListener(){
     listaCurso.addEventListener('click', agregarCurso)
}
//elimina cursos de carrito
carrito.addEventListener('click', EliminarCurso)

carrito.addEventListener('click', () => {
     articulosCarrito = []
     limpiarHTML()
})

function agregarCurso(e){
     e.preventDefault()

     if(e.target.classList.contains('agregar-carrito')){
          const cursoSeleccionado = e.target.parentElement.parentElement
          leerDatosCurso(cursoSeleccionado)
     }
}

function EliminarCurso(e){
 if(e.target.classList.contains('borrar-curso')){
     const cursoId = e.target.getAttribute('data-id')
     articulosCarrito = articulosCarrito.filter(curso => curso.id != cursoId)
     console.log(articulosCarrito)
     carritoHTML()
}
else{

}

}
function leerDatosCurso(curso){
console.log(curso)
const infoCurso = {
     imagen: curso.querySelector('img').src,
     tiutlo: curso.querySelector('h4').textContent,
     precio: curso.querySelector('.precio span').textContent,
     id: curso.querySelector('a').getAttribute('data-id'),
     cantidad: 1
}
//Revisa si hay elementos en el carrito
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
if(existe){
const cursos = articulosCarrito.map( curso => {
     if(curso.id === infoCurso.id){
          curso.cantidad++
          return curso
     }
     else{
          return curso
     }
})
}
else{
     articulosCarrito = [...articulosCarrito, infoCurso]
}
// agrega elementos al carrito

console.log(articulosCarrito)
carritoHTML()
}

// Recorre el carrito y genera el html
function carritoHTML(){

     //Limpia HTML
     limpiarHTML()
     articulosCarrito.forEach( curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>
               <img src = "${curso.imagen}" width = "150">
          </td>
          <td>
               ${curso.tiutlo}
          </td>
          <td>
               ${curso.precio}
          </td>
          <td>
               ${curso.cantidad}
          </td>
          <td>
          <a href = "#" class= "borrar-curso" data-id = "${curso.id}"> x </a>
          </td>
          ` ;

          //agrega el HTML del carrito en el tbody
          contenedorCarrito.appendChild(row);
     })
}
//Elimina los cursos del tbody
function limpiarHTML(){
     //contenedorCarrito.innerHTML = ''| otra forma
     while(contenedorCarrito.firstChild){
          contenedorCarrito.removeChild(contenedorCarrito.firstChild) // mientras contenedorCarrito tenga una hijo se eliminara hasta que quede vacío
     }
}