export class Articulo {
  // Crea un artículo con los datos recibidos y valida su duración.
  constructor(datos) {
    this.id = datos.id;
    this.titulo = datos.titulo;
    this.genero = datos.genero;
    this.fechaLanzamiento = datos.fechaLanzamiento;
    this.sinopsis = datos.sinopsis;
    this.tipo = datos.tipo;
    this.duracion = datos.duracion;
  }

  // Devuelve la duración del artículo en minutos.
  get duracion() {
    return this._duracion;
  }

  // Guarda la duración solo si es un número positivo.
  set duracion(minutos) {
    if (typeof minutos !== "number" || minutos <= 0) {
      throw new Error(`Duración no válida en «${this.titulo}»: ${minutos}`);
    }
    this._duracion = minutos;
  }

  // Expresa la duración en horas y minutos para mostrarla en pantalla.
  get duracionTexto() {
    const horas = Math.floor(this._duracion / 60);
    const mins = this._duracion % 60;

    if (horas === 0) return `${mins} min`;
    if (mins === 0) return `${horas} h`;
    return `${horas} h ${mins} min`;
  }

  // Indica si el artículo es largo según su tipo y duración.
  esLarga() {
    const tipo = this.tipo.toLowerCase();

    if (tipo === "pelicula" || tipo === "película") {
      return this._duracion > 60;
    }

    if (tipo === "serie") {
      return this._duracion > 60;
    }

    return false;
  }

  // Combina los datos principales del artículo en una descripción.
  descripcion() {
    const estado = this.esLarga() ? "larga" : "no larga";
    return `${this.tipo} (${this.genero}) • ${this.duracionTexto} • ${estado} — ${this.sinopsis} `;
  }
}
