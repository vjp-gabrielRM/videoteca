
// importa dos funciones de logica.js; "anadir" se renombra a "anadirALista"
import { anadir as anadirALista, buscarPorTexto } from "./logica.js";


// crea y exporta la clase para usarla desde otros archivos 
export class Videoteca {
  constructor(lista = []) {
    this._lista = [...lista];
  }

  // devuelve cuantos elementos hay
  get total() {
    return this._lista.length;
  }

  // devuelve todos los elementos 
  listar() {
    return [...this._lista];
  }

  // anade un elemento
  anadir(elemento) {
    return anadirALista(this._lista, elemento);
  }

  // elimina un elemento por su id
  eliminar(id) {
    const indice = this._lista.findIndex((elemento) => elemento.id === id);
    if (indice === -1) {
      return false;
    }

    this._lista.splice(indice, 1);
    return true;
  }

  // busca elementos por texto
  buscar(texto) {
    return buscarPorTexto(this._lista, texto);
  }
}