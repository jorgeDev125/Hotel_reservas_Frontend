import { formatCurrency } from "../../utils/utils";
import PopupCearReserva from "../reserva/PopupCrearReserva";
import PopupEditarEstadoHab from "./PopupEditarEstado";

export default class HabitacionItem {
  constructor(data) {
    this._habitacionId = data.habitacion_id;
    this._numero = data.numero;
    this._categoria = data.categoria;
    this._precio = data.precio;
    this._estado = data.estado_habitacion;
    this._data = data;
  }

  //función para clonar la plantilla
  _getTemplate() {
    const newCard = document
      .querySelector("#roomItem-template")
      .content.querySelector(".room__card")
      .cloneNode(true);
    return newCard;
  }

  _setEventListeners() {
    // Agregar el evento para abrir el popup de reserva

    this._element
      .querySelector("#agregarReservaButton")
      .addEventListener("click", () => {
        localStorage.setItem(
          "habitacion_para_popup",
          JSON.stringify({
            numero: this._numero,
            categroia: this._categoria,
            precio: this._precio,
          })
        );

        const popupReserva = new PopupCearReserva();
        const popup = popupReserva.generatePopup();
        popup.querySelector("#habitacion_numero").textContent = this._numero;
        popup.querySelector("#habitacion_categoria").textContent =
          this._categoria;
        popup.querySelector("#habitacion_precio").textContent = formatCurrency(
          this._precio
        );
        popup.querySelector("#habitacion_id").value = this._habitacionId;
        popupReserva.open();
        document.querySelector(".popup").prepend(popup);
      });

    this._element
      .querySelector(".room-status__icon")
      .addEventListener("click", () => {
        const popupEstadoHab = new PopupEditarEstadoHab(this._data);
        const popup = popupEstadoHab.generatePopup();
        popupEstadoHab.open();
        document.querySelector(".popup").prepend(popup);
      });
  }

  generateRoom() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.id = this._habitacionId;
    this._element.querySelector(".room__card-number").textContent =
      this._numero;
    this._element.querySelector(".room__card-category").textContent =
      this._categoria;
    this._element.querySelector(".room__card-price").textContent =
      formatCurrency(this._precio);
    this._element.querySelector(".room__card-status").textContent =
      this._estado.toUpperCase();
    this._element.querySelector(".room-status__icon").alt = this._estado;

    switch (this._estado) {
      case "Disponible":
        this._element.classList.add("border-lime-600");
        this._element
          .querySelector(".room__card-status")
          .classList.add("bg-lime-600");
        this._element
          .querySelector(".room-status__icon")
          .classList.add("bg-lime-600", "hover:bg-lime-500");
        this._element.querySelector(".room-status__icon").src =
          "images/completada.png";
        break;
      case "Reservada":
        this._element.classList.add("border-gray-500");
        this._element
          .querySelector(".room__card-status")
          .classList.add("bg-gray-500");
        this._element
          .querySelector(".room-status__icon")
          .classList.add("bg-gray-500", "hover:bg-gray-400");
        this._element.querySelector(".room-status__icon").src =
          "images/reservada.png";
        this._element
          .querySelector("#agregarReservaButton")
          .classList.add("hidden");
        break;
      case "Ocupada":
        this._element.classList.add("border-amber-600");
        this._element
          .querySelector(".room__card-status")
          .classList.add("bg-amber-600");
        this._element
          .querySelector(".room-status__icon")
          .classList.add("bg-amber-600", "hover:bg-amber-500");
        this._element.querySelector(".room-status__icon").src =
          "images/ocupada.png";
        this._element
          .querySelector("#agregarReservaButton")
          .classList.add("hidden");
        break;
      case "En Limpieza":
        this._element.classList.add("border-blue-700");
        this._element
          .querySelector(".room__card-status")
          .classList.add("bg-blue-700");
        this._element
          .querySelector(".room-status__icon")
          .classList.add("bg-blue-700", "hover:bg-blue-600");
        this._element.querySelector(".room-status__icon").src =
          "images/limpieza.png";
        this._element
          .querySelector("#agregarReservaButton")
          .classList.add("hidden");
        break;
      case "No Disponible":
        this._element.classList.add("border-red-600");
        this._element
          .querySelector(".room__card-status")
          .classList.add("bg-red-600");
        this._element
          .querySelector(".room-status__icon")
          .classList.add("bg-red-600", "hover:bg-red-500");
        this._element.querySelector(".room-status__icon").src =
          "images/no-disponible.png";
        this._element
          .querySelector("#agregarReservaButton")
          .classList.add("hidden");
        break;
    }

    return this._element;
  }
}
