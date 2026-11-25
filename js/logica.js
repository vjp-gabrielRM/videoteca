// Devuelve los artículos cuyo título contiene el texto buscado.
export function buscarPorTexto(lista, texto) {
  const buscado = texto.toLowerCase();
  // Comprueba cada título sin distinguir entre mayúsculas y minúsculas.
  return lista.filter((elemento) => elemento.titulo.toLowerCase().includes(buscado));
}

// Asigna un identificador consecutivo y añade el artículo a la lista.
export function anadir(lista, elemento) {
  let id = 0;
  for (const articulo of lista) {
    if (articulo.id > id) {
      id = articulo.id;
    }
  }
  elemento.id = id + 1;
  lista.push(elemento);
  return elemento.id;
}

// Calcula la duración total, la media y el artículo más largo.
export function obtenerEstadisticas(lista) {
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

// Convierte una fecha en formato de texto a un objeto Date local.
export function crearFecha(texto) {
  return new Date(texto + "T00:00");
}

// Convierte una fecha al formato legible en español.
export function fechaLegible(texto) {
  return crearFecha(texto).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Calcula cuántos días han pasado desde la fecha indicada.
export function diasDesde(texto) {
  const MS_DIA = 24 * 60 * 60 * 1000;
  const ms = Date.now() - crearFecha(texto).getTime();
  return Math.floor(ms / MS_DIA);
}

// Devuelve una copia de la lista ordenada según el criterio indicado.
export function ordenar(lista, criterio) {
  const copia = [...lista];

  if (criterio === "duracion") {
    // Compara las duraciones de menor a mayor.
    copia.sort((a, b) => a.duracion - b.duracion);
  } else if (criterio === "fecha") {
    // Compara las fechas de más reciente a más antigua.
    copia.sort((a, b) => crearFecha(b.fechaLanzamiento) - crearFecha(a.fechaLanzamiento));
  } else {
    // Compara los títulos alfabéticamente según las reglas del español.
    copia.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
  }

  return copia;
}

// Clase gestora de la colección de artículos de la videoteca.
export class Gestora {
  constructor(lista = []) {
    this.lista = lista;
  }

  // Calcula las estadísticas de la colección usando únicamente métodos de array.
  estadisticas() {
    if (this.lista.length === 0) {
      return null;
    }

    const totalMinutos = this.lista.reduce(
      (suma, articulo) => suma + articulo.duracion,
      0
    );
    const peliculas = this.lista.filter(
      (articulo) => articulo.tipo === "Película"
    ).length;
    const masLarga = this.lista.reduce(
      (mayor, articulo) =>
        articulo.duracion > mayor.duracion ? articulo : mayor,
      this.lista[0]
    );
    const titulos = this.lista.map((articulo) => articulo.titulo);

    return {
      totalMinutos,
      mediaMinutos: totalMinutos / this.lista.length,
      masLarga,
      peliculas,
      titulos,
    };
  }
}
