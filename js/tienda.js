const agregarTodo = document.querySelectorAll('.anadirP');
agregarTodo.forEach((anadir) => {
  anadir.addEventListener('click', agregarCompra);
});

const botonC = document.querySelector('.botonC');
botonC.addEventListener('click', comprarB);

const contenedorCarrito = document.querySelector(
  '.contenedorCarrito'
);

function agregarCompra(event) {
  const button = event.target;
  const item = button.closest('.item');

  const productos = item.querySelector('.nombreProducto').textContent;
  const precioP = item.querySelector('.precio').textContent;
  const imagenP = item.querySelector('.imagenProducto').src;

  ProductoC(productos, precioP, imagenP);
}

function ProductoC(productos, precioP, imagenP) {
  const articulos = contenedorCarrito.getElementsByClassName(
    'nomProd'
  );
  for (let i = 0; i < articulos.length; i++) {
    if (articulos[i].innerText === productos) {
      let cosas = articulos[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.cantidadCarrito'
      );
      cosas.value++;
      $('.toast').toast('show');
      actualizarTotal();
      return;
    }
  }

  const productoEnCarrito = document.createElement('div');
  const cContenido = `
  <div class="row itemsP">
        <div class="col-6">
            <div class="imagenP d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${imagenP} class="carro-imagen">
                <h6 class="nPro nomProd text-truncate ml-3 mb-0">${productos}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="pro-precio d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="precio mb-0 valorProducto">${precioP}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="cantidad-carrito d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="anadir-cantidad-carrito cantidadCarrito" type="number"
                    value="1">
                <button class="btn btn-danger remover" type="button">X</button>
            </div>
        </div>
    </div>`;
    productoEnCarrito.innerHTML = cContenido;
  contenedorCarrito.append(productoEnCarrito);

  productoEnCarrito
    .querySelector('.remover')
    .addEventListener('click', eliminarP);

    productoEnCarrito
    .querySelector('.cantidadCarrito')
    .addEventListener('change', cantidadT);

    actualizarTotal();
}

function actualizarTotal() {
  let total = 0;
  const precioTotal = document.querySelector('.precioTotal');

  const totalPro = document.querySelectorAll('.itemsP');

  totalPro.forEach((itemsP) => {
    const precioArticulo = itemsP.querySelector(
      '.valorProducto'
    );
    const valorProducto = Number(
      precioArticulo.textContent.replace('$', '')
    );
    const cantidadArticulo = itemsP.querySelector(
      '.cantidadCarrito'
    );
    const cantidadCarrito = Number(
      cantidadArticulo.value
    );
    total = total + valorProducto * cantidadCarrito;
  });
  precioTotal.innerHTML = `$${total}`;
  document.getElementById("checkout").innerHTML = `Total $${total}`;
}

function eliminarP(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.itemsP').remove();
  actualizarTotal();
}

function cantidadT(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizarTotal();
}

function comprarB() {
  contenedorCarrito.innerHTML = '';
  actualizarTotal();
}

var btnMenu = document.getElementById('btn-menu');
var nav = document.getElementById('nav');
btnMenu.addEventListener('click',function(){
   nav.classList.toggle('muestrate');
})