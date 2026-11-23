

// Importa las funciones de lógica y renombra "anadir" como "anadirALista".
import { anadir as anadirALista, buscarPorTexto } from "./logica.js";

/**
 * Representa un artículo audiovisual de la videoteca.
 */
export class Articulo {
  /**
   * Crea un artículo audiovisual.
   * @param {number|string} id Identificador único del artículo.
   * @param {string} titulo Título del artículo.
   * @param {string} genero Género al que pertenece.
   * @param {string} fechaLanzamiento Fecha de lanzamiento.
   * @param {string} sinopsis Resumen del artículo.
   * @param {string} tipo Tipo de contenido.
   * @param {number|string} duracion Duración del artículo.
   */
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

/**
 * Gestiona una colección de artículos audiovisuales.
 */
export class Videoteca {
  
  /**
   * Construye una videoteca a partir de objetos de datos.
   * @param {Array<Object>} datos Objetos con los datos de los artículos.
   * @returns {Videoteca} Videoteca con artículos instanciados.
   */
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