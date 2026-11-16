export function buscarPorTexto(lista, texto) {
  const buscado = texto.toLowerCase();
  return lista.filter((elemento) => elemento.titulo.toLowerCase().includes(buscado));
}

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

export function crearFecha(texto) {
  return new Date(texto + "T00:00");
}

export function fechaLegible(texto) {
  return crearFecha(texto).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function diasDesde(texto) {
  const MS_DIA = 24 * 60 * 60 * 1000;
  const ms = Date.now() - crearFecha(texto).getTime();
  return Math.floor(ms / MS_DIA);
}

export function ordenar(lista, criterio) {
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
