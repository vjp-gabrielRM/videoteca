const NOMBRE_APP = "Videoteca";
const AÑO = 2010;

const articulos = [
  {
    id: 1,
    titulo: "La última estación",
    genero: "Drama",
    fechaLanzamiento: "2023-03-17",
    sinopsis: "Una restauradora vuelve a su pueblo para recuperar el antiguo cine familiar.",
    tipo: "Película",
  },
  {
    id: 2,
    titulo: "Código Boreal",
    genero: "Ciencia ficción",
    fechaLanzamiento: "2021-09-08",
    sinopsis: "La tripulación de una estación polar investiga una señal que llega bajo el hielo.",
    tipo: "Serie",
  },
  {
    id: 3,
    titulo: "Días de papel",
    genero: "Comedia",
    fechaLanzamiento: "2008-05-22",
    sinopsis: "Dos amigos intentan salvar la pequeña librería en la que crecieron.",
    tipo: "Película",
  },
  {
    id: 4,
    titulo: "Puerto de niebla",
    genero: "Misterio",
    fechaLanzamiento: "2019-11-14",
    sinopsis: "Una inspectora investiga la desaparición de un barco en una ciudad costera.",
    tipo: "Serie",
  },
  {
    id: 5,
    titulo: "Kilómetro cero",
    genero: "Aventura",
    fechaLanzamiento: "2004-07-02",
    sinopsis: "Tres hermanos emprenden un viaje por carretera para cumplir una promesa familiar.",
    tipo: "Película",
  },
  {
    id: 6,
    titulo: "Turno de noche",
    genero: "Drama",
    fechaLanzamiento: "2022-01-28",
    sinopsis: "El personal de urgencias de un hospital afronta nuevos retos en cada turno.",
    tipo: "Serie",
  },
  {
    id: 7,
    titulo: "El jardín sumergido",
    genero: "Fantasía",
    fechaLanzamiento: "2012-10-19",
    sinopsis: "Una joven descubre un jardín oculto que solo aparece cuando sube la marea.",
    tipo: "Película",
  },
  {
    id: 8,
    titulo: "Mapa de estrellas",
    genero: "Aventura",
    fechaLanzamiento: "2007-02-06",
    sinopsis: "Un grupo de estudiantes sigue un mapa antiguo hasta un observatorio abandonado.",
    tipo: "Serie",
  },
];

console.log(`${NOMBRE_APP}: ${articulos.length} elementos cargados`);
console.table(articulos);

// Muestra todas las series y películas con su etiqueta.
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

// Busca películas estrenadas desde el año indicado.
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
// Cuenta cuántas series y películas hay en la colección.
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

listarTodos(articulos);

const peliculasDesde2010 = filtrarPeliculasDesdeAño(articulos, 2010);
console.log(`Encontradas desde 2010: ${peliculasDesde2010}`);

const peliculasDesde2015 = filtrarPeliculasDesdeAño(articulos, 2015);
console.log(`Encontradas desde 2015: ${peliculasDesde2015}`);

console.log("Filtro usando el año por defecto:");
const peliculasDesdeAñoPorDefecto = filtrarPeliculasDesdeAño(articulos);
console.log(`Encontradas con el límite por defecto: ${peliculasDesdeAñoPorDefecto}`);

contarPorTipo(articulos);