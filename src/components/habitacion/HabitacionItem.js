import { formatCurrency } from "../../utils/utils";

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
    this._element
      .addEventListener("click", () => {
        console.log(this._habitacionId)
      });
    // Agregar el evento para el botón de eliminar
   
  }

  generateRoom() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.id = this._habitacionId;
    this._element.querySelector(".room__card-number").textContent = this._numero;
    this._element.querySelector(".room__card-category").textContent = this._categoria;
    this._element.querySelector(".room__card-price").textContent = formatCurrency(this._precio);
    this._element.querySelector(".room__card-status").textContent = this._estado.toUpperCase();


    return this._element;
  }
}
