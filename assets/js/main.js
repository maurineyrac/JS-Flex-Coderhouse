/* ======= BACK TO TOP SCRIPT =======  */
function backToTop() {
  const mybutton = document.getElementById("envol-btt");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      mybutton.classList.add('customshow')
    } else {
      mybutton.classList.remove('customshow')
    }
  }

  mybutton.addEventListener("click", backToTop);

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
backToTop();

/* ======= NAVBAR JS - COLAPSAR AL HACER CLICK =======  */

function colapsarnavbar() {
  const navbarcoll = document.getElementById('navbarSupportedContent');
  const changeicon = document.getElementById('menu-icon');

  changeicon.onclick = function () {
    changeicon.classList.toggle('fa-times');
  }

  document.onclick = function (clickevent) {
    if (clickevent.target.id !== 'navbarSupportedContent' && clickevent.target.id !== 'menu-icon') {
      changeicon.classList.remove('fa-times');
      bsCollapse.hide();
    }
  }

  const navlinks = document.querySelectorAll('.nav-item');
  const bsCollapse = new bootstrap.Collapse(navbarcoll, { toggle: false });
  navlinks.forEach((click) => {
    click.addEventListener('click', () => { bsCollapse.hide() })
  })
}
colapsarnavbar();

// Función para redondear números a 4 decimales
function redondearNumero(numero) {
  return parseFloat(numero.toFixed(4));
}

// Función para validar el nombre del producto
function validarNombreProducto(nombre) {
  return (nombre == null || nombre == "" || !isNaN(nombre));
}

// Función para validar los valores numéricos
function validarValoresNumericos(unidades, costo, margen) {
  return (
    (
      isNaN(unidades) ||
      unidades <= 0 ||
      isNaN(costo) ||
      costo <= 0 ||
      isNaN(margen) ||
      margen < 0 ||
      margen > 99
    )
  );
}

// Función para limpiar las cards existentes y que no se repitan
function limpiarCards() {
  const wraper = document.getElementById("cardwrap");
  while (wraper.firstChild) {
    wraper.removeChild(wraper.firstChild);
  }
}

// Función para mostrar una notificación
function mostrarNotificacion(titulo, mensaje, tipo) {
  Swal.fire(titulo, mensaje, tipo);
}

// Funcion que verifica y guarda los datos en el localStorage, es llamada luego en validaryGuardar();
function guardarEnLocalStorage(nombreProducto, costU, formulaPv, unidadesProducidas, margenSobrePv, formulaRent) {
  const datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
  const productoExistente = datosGuardados.find((item) => item.Nombre === nombreProducto);

  if (!productoExistente) {
    const nuevoproducto = {
      Nombre: nombreProducto,
      Costo: costU,
      Precio: formulaPv,
      Stock: unidadesProducidas,
      Utilidad: margenSobrePv,
      Rentabilidad: formulaRent,
    }
    datosGuardados.push(nuevoproducto);
    localStorage.setItem("datos", JSON.stringify(datosGuardados));

    mostrarNotificacion('Bien!', `El producto ${nuevoproducto.Nombre} se agregó correctamente.`, 'success');
    const formid = document.getElementById('form1')
    formid.reset()
  } else {
    mostrarNotificacion('Error', `El producto ${nombreProducto} ya existe.`, 'error');
  }
}

// Funcion para crear y agregar cards
function crearCard(producto) {
  const wraper = document.getElementById("cardwrap");

  const contcard = document.createElement("div");
  contcard.classList.add("customcard2", "cardhover");

  contcard.innerHTML = `<div class="cardimg">
    <i class="fa-solid fa-shirt"></i>
  </div>
  <div class="card-filter"></div>
  <div class="cont-cardtxt minheight">
    <p class="p-card">
    <strong>Nombre:</strong> ${producto.Nombre}
    </p>
    <p class="p-card">
    <strong>Costo:</strong> ${producto.Costo}
  </p>
    <p class="p-card">
    <strong> Precio:</strong> ${producto.Precio}
    </p>
    <p class="p-card">
    <strong> Stock:</strong> ${producto.Stock}
    </p>
    <p class="p-card">
    <strong> Utilidad:</strong> ${producto.Utilidad}%
    </p>
    <p class="p-card">
    <strong>  Rentabilidad:</strong> ${producto.Rentabilidad}%
    </p>
  </div>`;

  wraper.appendChild(contcard);
}
// Funcion que valida y realiza los calculos correspondientes, guarda todos los datos especificados en LS con la funcion guardarEnLocalStorage();
function validaryGuardar(e) {
  e.preventDefault();

  const nombreProducto = document.getElementById("input1").value.toLowerCase();
  const unidadesProducidas = parseInt(document.getElementById("input2").value);
  const costoTotal = parseFloat(document.getElementById("input3").value);
  const margenSobrePv = parseFloat(document.getElementById("input4").value);

  if (validarNombreProducto(nombreProducto)) {
    mostrarNotificacion("Error", "Ingrese un nombre válido.", "error");
  }
  else if (validarValoresNumericos(unidadesProducidas, costoTotal, margenSobrePv)) {
    mostrarNotificacion("Error", "Ingrese valores válidos.", "error");
  } else {
    const costU = redondearNumero(costoTotal / unidadesProducidas);
    const formulaPv = redondearNumero(costU / (1 - margenSobrePv / 100));
    const formulaRent = redondearNumero(((formulaPv - costU) / costU) * 100);
    guardarEnLocalStorage(nombreProducto, costU, formulaPv, unidadesProducidas, margenSobrePv, formulaRent);
  }
}


// Funcion para cargar datos del localStorage
function cargarDatosLs() {
  const datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
  // Primero limpio las card existentes
  limpiarCards();
  // Luego genero una card por cada elemento guardado en el LS
  datosGuardados.forEach((producto) => {
    crearCard(producto);
  });
}

// Funcion para borrar el localStorage
function borrarDatosLs(e) {
  (e).preventDefault();
  localStorage.removeItem("datos");
  mostrarNotificacion('Hecho', 'Datos borrados exitosamente', 'success');
}

// Llamo a esta funcion al cargar la página para mostrar las cards existentes
cargarDatosLs();

// Agrego un evento click al boton guardarBoton
document.getElementById('guardarBoton').addEventListener('click', validaryGuardar);
document.getElementById('guardarBoton').addEventListener('click', cargarDatosLs);

// Agregar un evento click al botón de borrarLS
document.getElementById("borrarLS").addEventListener("click", borrarDatosLs);
document.getElementById("borrarLS").addEventListener("click", limpiarCards);









