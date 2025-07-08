import { formatDateTime } from "../../utils/utils";
import PopupDetalleReserva from "./PopupDetalleReserva";

export default class ReservaItem {
  constructor(data) {
    this._reserva_id = data.id_reserva;
    this._fecha_registro = data.fecha_registro;
    this._numero_noches = data.numero_noches;
    this._numero_habitacion = data.numero_habitacion;
    this._precio_habitacion = data.precio_habitacion;
    this._categoria = data.categoria;
    this._estado_habitacion = data.estado_habitacion;
    this._cedula = data.cedula;
    this._nombre_cliente = data.nombre_cliente;
    this._apellido_cliente = data.apellido_cliente;
    this._telefono_cliente = data.telefono_cliente;
    this._email_cliente = data.email_cliente;
    this._precio_reserva = data.precio_reserva;
    this._estado_reserva = data.estado_reserva;
    this._data = data;
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
    this._element.addEventListener("click", () => {
      const popupDetalleReserva = new PopupDetalleReserva(this._data);
      const popup = popupDetalleReserva.generatePopup();
      popupDetalleReserva.open();
      document.querySelector(".popup").prepend(popup);
    });
    // Agregar el evento para el botón de eliminar
  }

  generateReserva() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.id = this._reserva_id;
    this._element.querySelector(".reservation__number").textContent =
      this._reserva_id;
    this._element.querySelector(".reservation__date").textContent =
      formatDateTime(this._fecha_registro);
    this._element.querySelector(".reservation__room_number").textContent =
      this._numero_habitacion;
    this._element.querySelector(
      ".reservation__client-name"
    ).textContent = `${this._nombre_cliente} ${this._apellido_cliente}`;
    this._element.querySelector(".reservation__status").textContent =
      this._estado_reserva.toUpperCase();
    this._element.querySelector(".reservation__icon").alt =
      this._estado_reserva;

    switch (this._estado_reserva) {
      case "Pendiente":
        this._element.classList.add("border-gray-500");
        this._element
          .querySelector(".reservation__status")
          .classList.add("bg-gray-500");
        this._element
          .querySelector(".reservation__icon")
          .classList.add("bg-gray-500");
        this._element.querySelector(".reservation__icon").src =
          "images/pendiente.png";
        break;
      case "Activa":
        this._element.classList.add("border-amber-600");
        this._element
          .querySelector(".reservation__status")
          .classList.add("bg-amber-600");
        this._element
          .querySelector(".reservation__icon")
          .classList.add("bg-amber-600");
        this._element.querySelector(".reservation__icon").src =
          "images/activa.png";
        break;
      case "Completada":
        this._element.classList.add("border-lime-600");
        this._element
          .querySelector(".reservation__status")
          .classList.add("bg-lime-600");
        this._element
          .querySelector(".reservation__icon")
          .classList.add("bg-lime-600");
        this._element.querySelector(".reservation__icon").src =
          "images/completada.png";
        break;
      case "Cancelada":
        this._element.classList.add("border-red-700");
        this._element
          .querySelector(".reservation__status")
          .classList.add("bg-red-700");
        this._element
          .querySelector(".reservation__icon")
          .classList.add("bg-red-700");
        this._element.querySelector(".reservation__icon").src =
          "images/no-disponible.png";
        break;
    }

    return this._element;
  }
}
