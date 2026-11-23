
// Importa las funciones de lógica y renombra "anadir" como "anadirALista".
import { anadir as anadirALista, buscarPorTexto } from "./logica.js";


export class Articulo {
  constructor(id, titulo, genero, fechaLanzamiento, sinopsis, tipo, duracion) {
    this.id = id;
    this.titulo = titulo;
    this.genero = genero;
    this.fechaLanzamiento = fechaLanzamiento;
    this.sinopsis = sinopsis;
    this.tipo = tipo;
    this.duracion = duracion;
  }
}

// Crea y exporta la clase para usarla desde otros archivos.
export class Videoteca {
  
  static desdeDatos(datos) {
    // Transforma cada objeto plano del array en una instancia de Articulo.
    const instancias = datos.map(
      (item) =>
        new Articulo(
          item.id,
          item.titulo,
          item.genero,
          item.fechaLanzamiento,
          item.sinopsis,
          item.tipo,
          item.duracion
        )
    );

    return new Videoteca(instancias);
  }

  //hace una copia de la lista
  constructor(lista = []) {
    this.lista = [...lista];
  }

  // Devuelve cuántos elementos hay.
  get total() {
    return this.lista.length;
  }

  // Devuelve todos los elementos.
  listar() {
    return [...this.lista];
  }

  // Añade un elemento.
  anadir(elemento) {
    return anadirALista(this.lista, elemento);
  }

  // Elimina un elemento por su id.
  eliminar(id) {
    const indice = this.lista.findIndex((elemento) => elemento.id === id);
    if (indice === -1) {
      return false;
    }

    this.lista.splice(indice, 1);
    return true;
  }

  // Busca elementos por texto.
  buscar(texto) {
    return buscarPorTexto(this.lista, texto);
  }
}