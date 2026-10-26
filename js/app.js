const NOMBRE_APP = "Videoteca";
const AÑO = 2010;
const AÑO_FILTRO_2015 = 2015;

// Catálogo inicial de películas y series.
const articulos = [
  {
    id: 1,
    titulo: "La ultima estación",
    genero: "Drama",
    fechaLanzamiento: "2023-03-17",
    sinopsis: "Una restauradora vuelve a su pueblo para recuperar el antiguo cine familiar.",
    tipo: "Película",
    duracion: 112,
  },
  {
    id: 2,
    titulo: "Codigo Boreal",
    genero: "Ciencia ficción",
    fechaLanzamiento: "2021-09-08",
    sinopsis: "La tripulación de una estación polar investiga una señal que llega bajo el hielo.",
    tipo: "Serie",
    duracion: 48,
  },
  {
    id: 3,
    titulo: "Dias de papel",
    genero: "Comedia",
    fechaLanzamiento: "2008-05-22",
    sinopsis: "Dos amigos intentan salvar la pequeña librería en la que crecieron.",
    tipo: "Película",
    duracion: 96,
  },
  {
    id: 4,
    titulo: "Puerto de niebla",
    genero: "Misterio",
    fechaLanzamiento: "2019-11-14",
    sinopsis: "Una inspectora investiga la desaparición de un barco en una ciudad costera.",
    tipo: "Serie",
    duracion: 52,
  },
  {
    id: 5,
    titulo: "Kilometro cero",
    genero: "Aventura",
    fechaLanzamiento: "2004-07-02",
    sinopsis: "Tres hermanos emprenden un viaje por carretera para cumplir una promesa familiar.",
    tipo: "Película",
    duracion: 105,
  },
  {
    id: 6,
    titulo: "Turno de noche",
    genero: "Drama",
    fechaLanzamiento: "2022-01-28",
    sinopsis: "El personal de urgencias de un hospital afronta nuevos retos en cada turno.",
    tipo: "Serie",
    duracion: 45,
  },
  {
    id: 7,
    titulo: "El jardín sumergido",
    genero: "Fantasía",
    fechaLanzamiento: "2012-10-19",
    sinopsis: "Una joven descubre un jardín oculto que solo aparece cuando sube la marea.",
    tipo: "Película",
    duracion: 118,
  },
  {
    id: 8,
    titulo: "Mapa de estrellas",
    genero: "Aventura",
    fechaLanzamiento: "2007-02-06",
    sinopsis: "Un grupo de estudiantes sigue un mapa antiguo hasta un observatorio abandonado.",
    tipo: "Serie",
    duracion: 50,
  },
];

console.log(`${NOMBRE_APP}: ${articulos.length} elementos cargados`);
console.table(articulos);

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
function estadisticas(lista) {
  if (lista.length === 0) {
    console.warn("No hay elementos en la videoteca");
    return;
  }
  let totalMinutos = 0;
  let masLarga = lista[0];
  for (const articulo of lista) {
    totalMinutos += articulo.duracion;
    if (articulo.duracion > masLarga.duracion) {
      masLarga = articulo;
    }
  }
  const mediaMinutos = totalMinutos / lista.length;
  console.log(`Total: ${totalMinutos} min`);
  console.log(`Media: ${mediaMinutos.toFixed(1)} min`);
  console.log(`Más larga: ${masLarga.titulo} (${masLarga.duracion} min)`);
}

// Ejemplos de estadísticas con elementos y con una lista vacía.
estadisticas(articulos);
estadisticas([]);


//Sprint 1

//variables
let textoBuscado = "";
let titulo = "titulo";

function ordenar(lista, titulo) {
  const copia = [...lista];

  if (titulo === "duracion") {
    copia.sort((a, b) => a.duracion - b.duracion);
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
    const titulo = document.createElement("h2");
    const detalles = document.createElement("p");
    const sinopsis = document.createElement("p");

    titulo.textContent = articulo.titulo;
    detalles.textContent = `${articulo.tipo} · ${articulo.genero} · ${articulo.fechaLanzamiento} · ${articulo.duracion} min`;
    sinopsis.textContent = articulo.sinopsis;
    ficha.append(titulo, detalles, sinopsis);
    catalogo.append(ficha);
  }
}

function actualizar() {
  const encontrados = buscarPorTexto(articulos, textoBuscado);
  pintar(ordenar(encontrados, titulo));
}

function buscar() {
  textoBuscado = document.querySelector("#buscador").value;
  actualizar();
}

document.querySelector("#buscador").addEventListener("input", buscar);
document.querySelector("#ordenNombre").addEventListener("click", () => { titulo = "titulo"; actualizar(); });
document.querySelector("#ordenNumero").addEventListener("click", () => {  titulo = "duracion"; actualizar(); });

actualizar();