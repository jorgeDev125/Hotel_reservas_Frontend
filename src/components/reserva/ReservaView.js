import PopupReserva from "./PopupReserva";

export default class ReservaView {
  constructor() {}

  //función para clonar la plantilla
  _getTemplate() {
    const newView = document
      .querySelector("#reservaViewTemplate")
      .content.querySelector(".reserva__view")
      .cloneNode(true);
    return newView;
  }

  _setEventListeners() {
    // Agregar el evento para el botón de agregar reserva
    this._element
      .querySelector("#addReservaButton")
      .addEventListener("click", () => {
        const popupReserva = new PopupReserva();
        const popup = popupReserva.generatePopup();
        popupReserva.open();
        document.querySelector(".popupReserva").prepend(popup);
      });
  }

  generateView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    return this._element;
  }
}
