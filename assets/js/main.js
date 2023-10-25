let flag

/* ======= BACK TO TOP SCRIPT =======  */
function backToTop() {
  const mybutton = document.getElementById("envol-btt");

  window.onscroll = () => {
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

  mybutton.addEventListener("click", backToTopL);

  function backToTopL() {
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

// Funciones para validar los valores numéricos
function validarValoresNumericos(...valores) {
  let valorinvalido = false
  for (const valor of valores) {
    if (isNaN(valor) || valor <= 0) {
      valorinvalido = true
    }
  }
  return valorinvalido
}
function validarMargen(margenSobrePv) {
  return (isNaN(margenSobrePv) || margenSobrePv < 1 || margenSobrePv > 99)
}

// Funcion para crear y agregar cards
function crearCard(producto, imgagenSrc) {
  const wraper = document.getElementById("cardwrap");
  const contcard = document.createElement("div");
  contcard.classList.add("customcard2", "cardhover");
  contcard.innerHTML = `<div class="cardimg">
  <img src="${imgagenSrc}" alt="${producto.Nombre}">
  </div>
  <div class="card-filter"></div>
  <div class="cont-cardtxt minheight">
    <p class="p-card">
    <strong>Nombre:</strong> ${producto.Nombre}
    </p>
    <p class="p-card">
    <strong>Costo:</strong> $ ${producto.Costo}
    </p>
    <p class="p-card">
    <strong> Precio:</strong> $ ${producto.Precio}
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
// Función para limpiar las cards existentes y que no se repitan
function limpiarCards() {
  const wraper = document.getElementById("cardwrap");
  while (wraper.firstChild) {
    wraper.removeChild(wraper.firstChild);
  }
}

// Función para mostrar una notificación personalizada con el parametro class1
function mostrarNotificacion(titulo, mensaje, error, class1) {
  Swal.fire({ title: titulo, text: mensaje, icon: error, customClass: { confirmButton: class1 }, buttonsStyling: false });
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
      Rentabilidad: formulaRent
    }
    datosGuardados.push(nuevoproducto);
    localStorage.setItem("datos", JSON.stringify(datosGuardados));
    mostrarNotificacion('Bien!', `El producto ${nuevoproducto.Nombre} se agregó correctamente.`, 'success', 'cbut');
    for (let i = 0; i <= 2; i++) {
      const inputElement = document.getElementById(`input${i}`);
      inputElement.value = ''
    }
  } else {
    mostrarNotificacion('Error', `El producto ${nombreProducto} ya existe.`, 'error', 'cbut');
  }
}

// Funcion para guardar los datos en el localStorage, es llamada luego en cargarDatosInic();
function guardarDatostotEnLs(unidadestot, costomp, costomod, costofijo) {
  const datosGuardadosTot = JSON.parse(localStorage.getItem("datostot")) || [];
  const datosInputs = {
    unidadestot: unidadestot,
    costompt: costomp,
    costomodt: costomod,
    costofijot: costofijo
  }
  datosGuardadosTot.push(datosInputs);
  localStorage.setItem("datostot", JSON.stringify(datosGuardadosTot));
  mostrarNotificacion('Bien!', `Los datos totales fueron guardados correctamente`, 'success', 'cbut');
  for (let i = 3; i <= 6; i++) {
    const inputElement = document.getElementById(`input${i}`);
    inputElement.disabled = true;
    inputElement.classList.add('disabled');
  }
  flag = true;
}

function mostrarDatosTot() {
  const datosGuardadosTot = JSON.parse(localStorage.getItem("datostot")) || [];
  // Creo un objeto para asociar id de input con la propiedad del objeto datosGuardadosTot
  const asocioIdyProp = {
    input3: "unidadestot",
    input4: "costompt",
    input5: "costomodt",
    input6: "costofijot"
  };
  flag = false
  // Verifico si hay datos en el localstorage
  if (datosGuardadosTot.length > 0) {
    flag = true
    const primerObjeto = datosGuardadosTot[0];
    // Itero a traves de los elementos de entrada y asigno valores de manera dinamica
    for (let inputId in asocioIdyProp) {
      const inputElement = document.getElementById(inputId);
      const propiedad = asocioIdyProp[inputId];
      inputElement.value = primerObjeto[propiedad];
    }
    // Si datosGuardadosTot ya fue cargado desabilito los inputs y le asigno un estilo
    for (let i = 3; i <= 6; i++) {
      const inputElement = document.getElementById(`input${i}`);
      inputElement.disabled = true;
      inputElement.classList.add('disabled');
    }
  }
}
// Funcion que valida y guarda los datos cargados totales en el localstorage
function cargaDatosInic(e) {
  e.preventDefault();
  if (flag) {
    mostrarNotificacion("Error", "Datos ya cargados", "error", 'cbut');
    return;
  }

  const unidadesProducidasTot = parseInt(document.getElementById("input3").value);
  const costoMP = parseFloat(document.getElementById("input4").value);
  const costoMOD = parseFloat(document.getElementById("input5").value);
  const costoFijo = parseFloat(document.getElementById("input6").value);

  if (validarValoresNumericos(unidadesProducidasTot, costoMP, costoMOD, costoFijo)) {
    mostrarNotificacion("Error", "Ingrese valores válidos.", "error", 'cbut');
  } else {
    guardarDatostotEnLs(unidadesProducidasTot, costoMP, costoMOD, costoFijo);

  }

}
// Funcion que valida y realiza los calculos correspondientes, guarda todos los datos especificados para las cards en LS con la funcion guardarEnLocalStorage();
function validaryGuardar(e) {
  e.preventDefault();
  const datosGuardadosTot = JSON.parse(localStorage.getItem("datostot")) || [];
  // Verifico si los datos totales fueron cargados primero
  if (!flag) {
    mostrarNotificacion("Error", "Cargue primero datos totales", "error", 'cbut');
    return;
  }
  // Carga de datos por el usuario
  const nombreProducto = document.getElementById("input0").value.toLowerCase();
  const unidadesProducidas = parseInt(document.getElementById("input1").value);
  const margenSobrePv = parseFloat(document.getElementById("input2").value);
  // Valido datos y realizo los calculos, los guardo en LS con la funcion guardarEnLocalStorage()
  if (validarNombreProducto(nombreProducto) || validarValoresNumericos(unidadesProducidas) || validarMargen(margenSobrePv)) {
    mostrarNotificacion("Error", "Ingrese datos validos y entre 1 y 99 para Margen", "error", 'cbut');
  }
  else {
    const data = datosGuardadosTot[0]
    const costoMPe = redondearNumero((data.costompt / data.unidadestot) * unidadesProducidas)
    const costoMODe = redondearNumero((data.costomodt / data.unidadestot) * unidadesProducidas);
    const costoFijoe = redondearNumero((data.costofijot / data.unidadestot) * unidadesProducidas);
    const costoTotale = redondearNumero((costoMPe + costoMODe + costoFijoe))

    const costU = redondearNumero(costoTotale / unidadesProducidas);
    const formulaPv = redondearNumero(costU / (1 - margenSobrePv / 100));
    const formulaRent = redondearNumero(((formulaPv - costU) / costU) * 100);
    guardarEnLocalStorage(nombreProducto, costU, formulaPv, unidadesProducidas, margenSobrePv, formulaRent);
  }
}

// Funcion para crear y mostrar cards con datos de localstorage
function mostrarCardsLs() {
  const datosGuardados = JSON.parse(localStorage.getItem("datos")) || [];
  // Primero limpio las card existentes
  limpiarCards();
  // Luego genero una card por cada elemento guardado en el localstorage
  datosGuardados.forEach((producto) => {
    crearCard(producto, "");
  });
  cargarImagenesAsync(datosGuardados);
}

// Funciones para borrar los datos de las cards de localstorage
function borrarDatosCardsLs() {
  localStorage.removeItem("datos");
  limpiarCards();
  mostrarNotificacion('Hecho', 'Cards borradas exitosamente', 'success', 'cbut');

}
// Funcion para borrar los datos totales de localstorage
function borrarDatosTotLs() {
  localStorage.removeItem("datostot");
  for (let i = 3; i <= 6; i++) {
    const inputElement = document.getElementById(`input${i}`);
    inputElement.disabled = false;
    inputElement.classList.remove('disabled');
    inputElement.value = '';
  }
  flag = false;
  mostrarNotificacion('Hecho', 'Datos borrados con exito', 'success', 'cbut')
}

// Agrego eventos a botones
document.getElementById('guardarBotonInic').addEventListener('click', cargaDatosInic);

document.getElementById("borrarDatosInic").onclick = function (e) {
  borrarDatosSwal(e, borrarDatosTotLs, 'datostot')
}
document.getElementById('guardarBotonCards').onclick = function (e) {
  validaryGuardar(e);
  mostrarCardsLs();
}
document.getElementById("borrarCards").onclick = function (e) {
  borrarDatosSwal(e, borrarDatosCardsLs, 'datos')
}

// Funcion para borrar datos con notificacion SweetAlert
function borrarDatosSwal(event, funcion, objname) {
  event.preventDefault();
  const datosGuardadosLS = JSON.parse(localStorage.getItem(objname)) || [];

  if (datosGuardadosLS.length > 0) {
    Swal.fire({
      title: 'Borrar todos los datos?',
      text: 'Tendras que cargar nuevos datos y se perdaran los anteriores',
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cbut me-2',
        cancelButton: 'cbutred ms-2'
      },
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        funcion();
      }
    });
  } else {
    mostrarNotificacion('Error', 'No hay datos locales', 'error', 'cbut');
  }
}
// Simulacion de API url
const apiURL = './database.json'

function cargarImagenesAsync(productos) {

  const cards = document.querySelectorAll(".customcard2");

  imgdefault(productos, cards)

  getAPI(apiURL, productos, cards)
}
// Llamo a estas funciones al cargar la página para mostrar las cards y datos existentes
mostrarDatosTot();
mostrarCardsLs();
// Funcion para asignar una imagen local en caso de que la API esta caida
function imgdefault(prods, cards) {
  for (let i = 0; i < prods.length; i++) {
    const elemento = cards[i].querySelector(".cardimg img")
    elemento.src = "./assets/img/default.png"
  }
}
// Funcion para realizar fetch
function getAPI(apiURL, productos, cards) {
  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al cargar base de datos: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      productos.forEach((producto, index) => {
        const imagenInfo = data.find((imagenInfo) => imagenInfo.nombre.includes(producto.Nombre));
        console.log(imagenInfo)
        const imagenSrc = imagenInfo ? imagenInfo.img : "./assets/img/default.png";
        const imgElement = cards[index].querySelector(".cardimg img");
        imgElement.src = imagenSrc;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}