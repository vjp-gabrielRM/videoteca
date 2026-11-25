import { datosArticulos } from "./datos.js";
import { Articulo } from "./articulo.js";
import {
  anadir,
  buscarPorTexto,
  diasDesde,
  fechaLegible,
  Gestora,
  ordenar,
} from "./logica.js";

const articulos = [];
for (const datos of datosArticulos) {
  articulos.push(new Articulo(datos));
}

// La gestora conserva la referencia al array y calcula sus estadísticas.
const gestora = new Gestora(articulos);

const PATRON_TITULO = /^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñü0-9 ]{2,59}$/;

let textoBuscado = "";
let criterio = "titulo";
const dias = 30;

// Guarda una cookie con una duración expresada en días.
function guardarCookie(nombre, valor, dias) {
  const segundos = dias * 24 * 60 * 60;
  const texto = encodeURIComponent(valor);
  document.cookie = `${nombre}=${texto}; max-age=${segundos}; path=/`;
}

// Busca una cookie por nombre y devuelve su valor, o null si no existe.
function leerCookie(nombre) {
  const partes = document.cookie.split("; ");
  for (const parte of partes) {
    const [clave, valor] = parte.split("=");
    if (clave === nombre) {
      return decodeURIComponent(valor);
    }
  }
  return null;
}

// Dibuja en el catálogo las fichas de los artículos recibidos.
function pintar(lista) {
  const catalogo = document.querySelector("#catalogo");
  catalogo.replaceChildren();

  for (const articulo of lista) {
    const ficha = document.createElement("article");
    const tituloElemento = document.createElement("h2");
    const detalles = document.createElement("p");
    const fecha = document.createElement("p");

    fecha.classList.add("fecha");
    fecha.textContent = fechaLegible(articulo.fechaLanzamiento);
    tituloElemento.textContent = articulo.titulo;
    detalles.textContent = articulo.descripcion();

    const diasTranscurridos = diasDesde(articulo.fechaLanzamiento);
    if (diasTranscurridos >= 0 && diasTranscurridos <= dias) {
      ficha.classList.add("reciente");
    }

    ficha.append(tituloElemento, detalles, fecha);
    catalogo.append(ficha);
  }
}

// Pinta las estadísticas devueltas por el método de la clase gestora.
function pintarEstadisticas() {
  const panel = document.querySelector("#estadisticas");
  const resumen = gestora.estadisticas();
  panel.replaceChildren();

  if (resumen === null) {
    const aviso = document.createElement("li");
    aviso.textContent = "No hay elementos en la videoteca.";
    panel.append(aviso);
    return;
  }

  const lineas = [
    `Duración total: ${resumen.totalMinutos} min`,
    `Duración media: ${resumen.mediaMinutos.toFixed(1)} min`,
    `Más larga: ${resumen.masLarga.titulo} (${resumen.masLarga.duracion} min)`,
    `Películas: ${resumen.peliculas}`,
    `Títulos: ${resumen.titulos.join(", ")}`,
  ];

  lineas.forEach((linea) => {
    const elemento = document.createElement("li");
    elemento.textContent = linea;
    panel.append(elemento);
  });
}

// Oculta el aviso cuando hay resultados y lo muestra cuando no los hay.
function pintarResumen(encontrados) {
  document.querySelector("#sinResultados").hidden = encontrados.length > 0;
}

// Busca, ordena y actualiza las distintas partes de la página.
function actualizar() {
  const encontrados = buscarPorTexto(articulos, textoBuscado);
  pintarResumen(encontrados);
  pintar(ordenar(encontrados, criterio));
  pintarEstadisticas();
}

// Lee el texto del buscador y actualiza los resultados.
function buscar() {
  textoBuscado = document.querySelector("#buscador").value;
  actualizar();
}

// Cambia el orden elegido, lo recuerda en una cookie y actualiza la página.
function elegirOrden(nuevo) {
  criterio = nuevo;
  guardarCookie("orden", criterio, dias);
  actualizar();
}

document.querySelector("#buscador").addEventListener("input", buscar);
// Selecciona el orden alfabético al pulsar el botón correspondiente.
document.querySelector("#ordenNombre").addEventListener("click", () => elegirOrden("titulo"));
// Selecciona el orden por duración al pulsar el botón correspondiente.
document.querySelector("#ordenNumero").addEventListener("click", () => elegirOrden("duracion"));
// Selecciona el orden por fecha al pulsar el botón correspondiente.
document.querySelector("#ordenFecha").addEventListener("click", () => elegirOrden("fecha"));

const ordenGuardado = leerCookie("orden");
if (ordenGuardado === "titulo" || ordenGuardado === "duracion" || ordenGuardado === "fecha") {
  criterio = ordenGuardado;
}
actualizar();

// Valida el formulario y añade un nuevo artículo al catálogo.
document.querySelector("#formAnadir").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nuevoTitulo = document.querySelector("#nuevoTitulo").value.trim();
  const nuevaDuracion = Number(document.querySelector("#nuevaDuracion").value);
  const aviso = document.querySelector("#avisoTitulo");

  if (!PATRON_TITULO.test(nuevoTitulo)) {
    aviso.textContent =
      "Título no válido: empieza en mayúscula, de 3 a 60 caracteres, sin símbolos";
    aviso.style.color = "red";
    return;
  }

  if (Number.isNaN(nuevaDuracion) || nuevaDuracion <= 0) {
    aviso.textContent = "La duración debe ser un número mayor que 0";
    aviso.style.color = "red";
    return;
  }

  aviso.textContent = "";

  anadir(
    articulos,
    new Articulo({
      titulo: nuevoTitulo,
      genero: document.querySelector("#nuevoGenero").value,
      fechaLanzamiento: document.querySelector("#nuevaFecha").value,
      sinopsis: document.querySelector("#nuevaSinopsis").value,
      tipo: document.querySelector("#nuevoTipo").value,
      duracion: nuevaDuracion,
    })
  );

  actualizar();
});

