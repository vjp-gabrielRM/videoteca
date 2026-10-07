const NOMBRE_APP = "Videoteca";
const ANIO_CORTE = 2010;

const elementos = [
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
    sinopsis: "Una inspectora investiga la desaparición de un barco en una tranquila ciudad costera.",
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
    sinopsis: "El personal de urgencias de un hospital afronta cada noche nuevos retos personales.",
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
    sinopsis: "Un grupo de estudiantes sigue un mapa antiguo para encontrar un observatorio abandonado.",
    tipo: "Serie",
  },
];

console.log(`${NOMBRE_APP}: ${elementos.length} elementos cargados`);
console.table(elementos);

console.log(`Listado de ${NOMBRE_APP}:`);
for (const elemento of elementos) {
  const anioLanzamiento = Number(elemento.fechaLanzamiento.slice(0, 4));
  const etiqueta = anioLanzamiento >= ANIO_CORTE ? "reciente" : "clásica";
  console.log(
    `${elemento.titulo} (${elemento.tipo}, ${elemento.fechaLanzamiento}) — ${etiqueta}`,
  );
}