import { datosArticulos } from "./datos.js";
import { Articulo } from "./articulo.js";
import {
  anadir,
  buscarPorTexto,
  diasDesde,
  fechaLegible,
  obtenerEstadisticas,
  ordenar,
} from "./logica.js";

const articulos = [];
for (const datos of datosArticulos) {
  articulos.push(new Articulo(datos));
}

const PATRON_TITULO = /^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñü0-9 ]{2,59}$/;

let textoBuscado = "";
let criterio = "titulo";
const dias = 30;

function guardarCookie(nombre, valor, dias) {
  const segundos = dias * 24 * 60 * 60;
  const texto = encodeURIComponent(valor);
  document.cookie = `${nombre}=${texto}; max-age=${segundos}; path=/`;
}

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

function pintarEstadisticas(lista) {
  const contenedor = document.querySelector("#estadisticas");
  const resumen = obtenerEstadisticas(lista);
  contenedor.replaceChildren();

  const encabezado = document.createElement("h2");
  encabezado.textContent = "Estadísticas";
  contenedor.append(encabezado);

  if (!resumen) {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No hay elementos en la videoteca.";
    contenedor.append(mensaje);
    return;
  }

  const total = document.createElement("p");
  total.textContent = `Duración total: ${resumen.totalMinutos} min`;
  const media = document.createElement("p");
  media.textContent = `Duración media: ${resumen.mediaMinutos.toFixed(1)} min`;
  const masLarga = document.createElement("p");
  masLarga.textContent = `Más larga: ${resumen.masLarga.titulo} (${resumen.masLarga.duracion} min)`;
  contenedor.append(total, media, masLarga);
}

function pintarResumen(encontrados) {
  document.querySelector("#sinResultados").hidden = encontrados.length > 0;
}

function actualizar() {
  const encontrados = buscarPorTexto(articulos, textoBuscado);
  pintarResumen(encontrados);
  pintar(ordenar(encontrados, criterio));
  pintarEstadisticas(articulos);
}

function buscar() {
  textoBuscado = document.querySelector("#buscador").value;
  actualizar();
}

function elegirOrden(nuevo) {
  criterio = nuevo;
  guardarCookie("orden", criterio, dias);
  actualizar();
}

document.querySelector("#buscador").addEventListener("input", buscar);
document.querySelector("#ordenNombre").addEventListener("click", () => elegirOrden("titulo"));
document.querySelector("#ordenNumero").addEventListener("click", () => elegirOrden("duracion"));
document.querySelector("#ordenFecha").addEventListener("click", () => elegirOrden("fecha"));

const ordenGuardado = leerCookie("orden");
if (ordenGuardado === "titulo" || ordenGuardado === "duracion" || ordenGuardado === "fecha") {
  criterio = ordenGuardado;
}
actualizar();

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

