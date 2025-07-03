import { formatCurrency } from "../../utils/utils";
import PopupReserva from "../reserva/PopupReserva";

export default class HabitacionItem {
  constructor(data) {
    this._habitacionId = data.habitacion_id;
    this._numero = data.numero;
    this._categoria = data.categoria;
    this._precio = data.precio;
    this._estado = data.estado_habitacion;
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
    // Agregar el evento para el botón de editar
    this._element.addEventListener("click", () => {
      const popupReserva = new PopupReserva();
      const popup = popupReserva.generatePopup();
      popup.querySelector("#habitacion").value = this._numero;
      popupReserva.open();
      document.querySelector(".popupReserva").prepend(popup);
    });
    // Agregar el evento para el botón de eliminar
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
          this._element.querySelector(".room__card-status").classList.add("bg-lime-600");
          this._element.querySelector(".room-status__icon").classList.add("bg-lime-600");
          this._element.querySelector(".room-status__icon").src = "./src/images/disponible.png";
          break;
        case "Ocupada":
          this._element.classList.add("border-amber-600");
          this._element.querySelector(".room__card-status").classList.add("bg-amber-600");
          this._element.querySelector(".room-status__icon").classList.add("bg-amber-600");
          this._element.querySelector(".room-status__icon").src = "./src/images/ocupada.png";
          break;
        case "En Limpieza":
          this._element.classList.add("border-blue-700");
          this._element.querySelector(".room__card-status").classList.add("bg-blue-700");
          this._element.querySelector(".room-status__icon").classList.add("bg-blue-600");
          this._element.querySelector(".room-status__icon").src = "./src/images/limpieza.png";
          break;
        case "No Disponible":
          this._element.classList.add("border-red-600");
          this._element.querySelector(".room__card-status").classList.add("bg-red-600");
          this._element.querySelector(".room-status__icon").classList.add("bg-red-600");
          this._element.querySelector(".room-status__icon").src = "./src/images/no-disponible.png";
          break;
      }

    return this._element;
  }
}
