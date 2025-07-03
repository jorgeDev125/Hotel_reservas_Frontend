export default class ReservaItem {
  constructor(data) {
    this._reserva_id = data.id_reserva;
    this._fecha_registro = data.fecha_registro;
    this._numero_noches = data.numero_noches;
    this._numero_habitacion = data.numero_habitacion;
    this._categoria = data.categoria;
    this._precio_habitacion = data.precio_habitacion;
    this._cedula = data.cedula;
    this._nombre_cliente = data.nombre_cliente;
    this._apellido_cliente = data.apellido_cliente;
    this._precio_reserva = data.precio_reserva;
    this._estado_reserva = data.estado_reserva;
  }


      

  //función para clonar la plantilla
  _getTemplate() {
    const newCard = document
      .querySelector("#reservationItem-template")
      .content.querySelector(".reservation__card")
      .cloneNode(true);
    return newCard;
  }


  _setEventListeners() {
    // Agregar el evento para el botón de editar
    this._element
      .addEventListener("click", () => {
        console.log(this._reserva_id)
      });
    // Agregar el evento para el botón de eliminar
   
  }

  generateReserva() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.id = this._reserva_id;
    this._element.querySelector(".reservation__room-number").textContent = this._numero_habitacion;
    this._element.querySelector(".reservation__date").textContent = this._fecha_registro;
    this._element.querySelector(".reservation__client-cedula").textContent = this._cedula;
    this._element.querySelector(".reservation__client-name").textContent = `${this._nombre_cliente} ${this._apellido_cliente}`;
    this._element.querySelector(".reservation__status").textContent = this._estado_reserva.toUpperCase();


    return this._element;
  }
}
