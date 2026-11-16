const NOMBRE_APP = "Videoteca";
const AÑO = 2010;
const AÑO_FILTRO_2015 = 2015;
const DIAS_RECIENTE = 30; // Añadido para el Reto 2


// Muestra cada título e indica si es reciente o clásico.
function listarTodos(articulos) {
  console.log(`Listado de ${NOMBRE_APP}:`);
  for (const articulo of articulos) {
    const añoLanzamiento = Number(articulo.fechaLanzamiento.slice(0, 4));
    const etiqueta = añoLanzamiento >= AÑO ? "reciente" : "clásica";
    console.log(
      `${articulo.titulo} (${articulo.tipo}, ${articulo.fechaLanzamiento}) — ${etiqueta}`,
    );
  }
}

// Muestra las películas desde un año y devuelve cuántas encontró.
const filtrarPeliculasDesdeAño = (articulos, añoLimite = AÑO) => {
  console.log(`Películas estrenadas desde ${añoLimite}:`);
  let encontradas = 0;

  for (const articulo of articulos) {
    const añoLanzamiento = Number(articulo.fechaLanzamiento.slice(0, 4));
    if (articulo.tipo === "Película" && añoLanzamiento >= añoLimite) {
      console.log(`${articulo.titulo} (${articulo.fechaLanzamiento})`);
      encontradas++;
    }
  }

  return encontradas;
};
// Cuenta las series y películas del catálogo.
function contarPorTipo(articulos) {
  let series = 0;
  let peliculas = 0;

  for (const articulo of articulos) {
    switch (articulo.tipo) {
      case "Serie":
        series++;
        break;
      case "Película":
        peliculas++;
        break;
      default:
        console.warn(`error inesperado`);
    }
  }

  console.log(`Series: ${series}`);
  console.log(`Películas: ${peliculas}`);
}

// Ejecuta los listados y filtros de ejemplo.
listarTodos(articulos);

const peliculasDesde2010 = filtrarPeliculasDesdeAño(articulos, 2010);
console.log(`Encontradas desde 2010: ${peliculasDesde2010}`);

const peliculasDesde2015 = filtrarPeliculasDesdeAño(articulos, AÑO_FILTRO_2015);
console.log(`Encontradas desde ${AÑO_FILTRO_2015}: ${peliculasDesde2015}`);

console.log("Filtro usando el año por defecto:");
const peliculasDesdeAñoPorDefecto = filtrarPeliculasDesdeAño(articulos);
console.log(`Encontradas con el límite por defecto: ${peliculasDesdeAñoPorDefecto}`);

contarPorTipo(articulos);

// Muestra el ID, título y género de cada elemento.
function listar(articulos) {
  for (const elemento of articulos) {
    console.log(elemento.id, elemento.titulo, elemento.genero);
  }
}

listar(articulos);

// Devuelve los títulos que contienen el texto buscado.
function buscarPorTexto(lista, texto) {
  const buscado = texto.toLowerCase();
  const resultado = [];
  for (const elemento of lista) {
    if (elemento.titulo.toLowerCase().includes(buscado)) {
      resultado.push(elemento);
    }
  }
  return resultado;
}
const texto = "boreal";
console.log(`Resultados de la búsqueda "${texto}":`);
console.table(buscarPorTexto(articulos, texto));

// Añade un elemento con un ID nuevo y devuelve ese ID.
function anadir(articulos, elemento) {
  let id = 0;
  for (const articulo of articulos) {
    if (articulo.id > id) {
      id = articulo.id;
    }
  }
  elemento.id = id + 1;
  articulos.push(elemento);
  return elemento.id;
}

// Ejemplo de elemento nuevo.
const elementoPrueba = {
  titulo: "Prueba",
  genero: "Aventura",
  fechaLanzamiento: "2010-01-01",
  sinopsis: "Ejemplo",
  tipo: "Serie",
  duracion: 45,
};

const articulosPrueba = [...articulos];
anadir(articulosPrueba, elementoPrueba);

listar(articulosPrueba);

// Elimina el elemento que tenga el ID indicado.
function eliminarPorId(articulos, id) {
  for (let i = 0; i < articulos.length; i++) {
    if (articulos[i].id === id) {
      articulos.splice(i, 1);
      return true;
    }
  }
  return false;
}

// Cambia el 3 por el ID que quieras eliminar.
console.log(eliminarPorId(articulosPrueba, 3));
listar(articulosPrueba);

// Calcula la duración total, la media y el elemento más largo.
function obtenerEstadisticas(lista) {
  if (lista.length === 0) {
    return null;
  }
  let totalMinutos = 0;
  let masLarga = lista[0];
  for (const articulo of lista) {
    totalMinutos += articulo.duracion;
    if (articulo.duracion > masLarga.duracion) {
      masLarga = articulo;
    }
  }
  return {
    totalMinutos,
    mediaMinutos: totalMinutos / lista.length,
    masLarga,
  };
}

function estadisticas(lista) {
  const resumen = obtenerEstadisticas(lista);
  if (!resumen) {
    console.warn("No hay elementos en la videoteca");
    return;
  }
  console.log(`Total: ${resumen.totalMinutos} min`);
  console.log(`Media: ${resumen.mediaMinutos.toFixed(1)} min`);
  console.log(`Más larga: ${resumen.masLarga.titulo} (${resumen.masLarga.duracion} min)`);
}

// Ejemplos de estadísticas con elementos y con una lista vacía.
estadisticas(articulos);
estadisticas([]);


// Sprint 1

let textoBuscado = "";
let criterio = "titulo";
let dias= 30;

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

function crearFecha(texto) {
    return new Date(texto + "T00:00");
}

function fechaLegible(texto) {
    return crearFecha(texto).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function diasDesde(texto) {
    const MS_DIA = 24 * 60 * 60 * 1000;
    const ms = Date.now() - crearFecha(texto).getTime();
    return Math.floor(ms / MS_DIA);
}

function ordenar(lista, criterio) {
    const copia = [...lista];

    if (criterio === "duracion") {
        copia.sort((a, b) => a.duracion - b.duracion);
    } else if (criterio === "fecha") {
        copia.sort((a, b) => crearFecha(b.fechaLanzamiento) - crearFecha(a.fechaLanzamiento));
    } else {
        copia.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
    }

    return copia;
}

function pintar(lista) {
    const catalogo = document.querySelector("#catalogo");
    catalogo.replaceChildren();

    for (const articulo of lista) {
        const ficha = document.createElement("article");
        const tituloElemento = document.createElement("h2");
        const detalles = document.createElement("p");
        const sinopsis = document.createElement("p");
        const fecha = document.createElement("p");

        fecha.classList.add("fecha");
        fecha.textContent = fechaLegible(articulo.fechaLanzamiento);

        tituloElemento.textContent = articulo.titulo;
        detalles.textContent = `${articulo.tipo} · ${articulo.genero} · ${articulo.duracion} min`;
        sinopsis.textContent = articulo.sinopsis;

        if (diasDesde(articulo.fechaLanzamiento) <= DIAS_RECIENTE) {
            ficha.classList.add("reciente");
        }

        ficha.append(tituloElemento, detalles, sinopsis, fecha);
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

function actualizar() {
    const encontrados = buscarPorTexto(articulos, textoBuscado);
    const contador = document.querySelector("#contador");
    contador.textContent = `Mostrando ${encontrados.length} de ${articulos.length}`;
    document.querySelector("#sinResultados").hidden = encontrados.length > 0;
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

// Requisito final del sprint 1: alta de elementos con un campo validado por regex.
// Empieza por mayúscula y tiene entre 3 y 60 caracteres (letras, números y espacios).
const PATRON_TITULO = /^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñü0-9 ]{2,59}$/;

document.querySelector("#formAnadir").addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nuevoTitulo = document.querySelector("#nuevoTitulo").value.trim();
    const aviso = document.querySelector("#avisoTitulo");

    if (!PATRON_TITULO.test(nuevoTitulo)) {
        aviso.textContent = "Título no válido: empieza en mayúscula, de 3 a 60 caracteres, sin símbolos";
        aviso.style.color = "red";
        return;
    }



    anadir(articulos, {
        titulo: nuevoTitulo,
        genero: document.querySelector("#nuevoGenero").value,
        fechaLanzamiento: document.querySelector("#nuevaFecha").value,
        sinopsis: document.querySelector("#nuevaSinopsis").value,
        tipo: document.querySelector("#nuevoTipo").value,
        duracion: Number(document.querySelector("#nuevaDuracion").value),
    });

    actualizar();
  
});

//Sprint 2


