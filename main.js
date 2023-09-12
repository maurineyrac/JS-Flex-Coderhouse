let productos = [];

alert("Calculadora de costos, para esto vas a necesitar:\n Unidades producidas, Costo total y % de beneficio deseado")

// Funcion para cargar productos, verifica si el producto ya existe previamente
function cargarProducto() {
  // Funcion para redondeo de decimales a maximo 4
  function redondearNumero(numero) {
    return parseFloat(numero.toFixed(4));
  }

  let nombreProducto = prompt("Ingrese el nombre del producto:");
  // Verifico que el valor ingresado no sea nulo o vacio
  if (nombreProducto == null || nombreProducto == "") {
    alert("El ingreso del producto fue cancelado.");

  }
  else {
    nombreProducto = nombreProducto.toLowerCase();
    let productoExistente = false;
    // Recorro el array y busco si el Nombre ya existe, si existe le asigno TRUE y salgo con break
    for (const producto of productos) {
      if (producto.Nombre.toLowerCase() == nombreProducto) {
        productoExistente = true;
        break;
      }
    }

    // Condicional para ver si cargamos o no, nuevos productos
    if (productoExistente) {
      alert(`El producto ${nombreProducto} ya existe en la lista.`);
    } else {
      let UnidadesProducidas = parseInt(prompt(`Ingrese cantidad de unidades producidas para ${nombreProducto}:`));
      let CostoTotal = parseFloat(prompt(`Ingrese costo total de la producción para ${nombreProducto}:`));
      let MargenSobrePv = parseFloat(prompt(`Ingrese el valor de Utilidad (%) deseado para ${nombreProducto}:`));
      if (
        isNaN(UnidadesProducidas) || UnidadesProducidas <= 0 ||
        isNaN(CostoTotal) || CostoTotal <= 0 ||
        isNaN(MargenSobrePv) || MargenSobrePv < 0 || MargenSobrePv > 99
      ) {
        alert("Por favor, ingrese valores numéricos válidos.");
      } else {
        let CostU = CostoTotal / UnidadesProducidas;
        CostU = redondearNumero(CostU);
        console.log(`El costo unitario para ${nombreProducto} es: ${CostU}`);

        let formulaPv = CostU / (1 - (MargenSobrePv / 100));
        formulaPv = redondearNumero(formulaPv);
        console.log(`El precio de venta para ${nombreProducto} es: ${formulaPv}`);

        let formulaRent = ((formulaPv - CostU) / CostU) * 100;
        formulaRent = redondearNumero(formulaRent);

        productos.push({ Nombre: nombreProducto, Precio: formulaPv, Utilidad: MargenSobrePv, Rentabilidad: formulaRent });
        alert("El producto se agregó correctamente.")
      }
    }
  }
}

// Funcion para mostrar todos los productos existentes con los atributos seleccionados en un mismo alert
function mostrarProductos() {

  let mensaje = "Lista de productos ingresados:\n"
  for (const producto of productos) {
    const { Nombre, Precio, Utilidad } = producto;
    mensaje += (`Articulo: ${Nombre}, Precio: $ ${Precio}, Utilidad ${Utilidad}%\n`)
  }
  alert(mensaje)
}

// Con este ciclo se ejecuta la funcion cargarProducto() hasta que el confirm pasa a ser FALSE
do {
  cargarProducto()

} while (confirm("¿Desea ingresar otro producto?"));

// Preguntar si quiero ver lista de productos
if (confirm("¿Desea ver los productos cargados?")) {
  mostrarProductos();
}

// Preguntar al usuario si desea calcular la rentabilidad
if (confirm("¿Desea calcular la rentabilidad de los productos?")) {
  // Mostrar la rentabilidad de cada producto en alert separados
  for (const producto of productos) {
    const { Nombre, Rentabilidad } = producto;
    alert(`Rentabilidad para ${Nombre}: ${Rentabilidad}%`);
  }
}

//Muestro todo el objeto en consola al final de la ejecucion del codigo
for (const producto of productos) {
  console.log(producto)
}



