import { apiHabitacionInstance } from "../../utils/habitacion";
import HabitacionItem from "./HabitacionItem";

export default class HabitacionView {
  constructor() {}

  //función para clonar la plantilla
  _getTemplate() {
    const newView = document
      .querySelector("#roomViewTemplate")
      .content.querySelector(".room__view")
      .cloneNode(true);
    return newView;
  }

  _setEventListeners() {
    // Agregar el evento para el botón de activar todas las habitaciones en limpieza
    this._element
      .querySelector("#activarHabitacionesButton")
      .addEventListener("click", () => {
        if (
          window.confirm(
            "Activar todas las habitaciones en estado de 'En Limpieza'"
          )
        ) {
          apiHabitacionInstance
            .cambiarTodasDeLimpiezaADisponble()
            .then(async () => {
              //recargar toda la página para que el boton de activar habitaciones se desactive
              location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }

  generateView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    return this._element;
  }
}
