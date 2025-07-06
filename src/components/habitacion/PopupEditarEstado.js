import { apiHabitacionInstance } from "../../utils/habitacion";
import HabitacionItem from "./HabitacionItem";

export default class PopupEditarEstadoHab {
  constructor(data) {
    this._habitacionId = data.habitacion_id;
    this._numero = data.numero;
    this._categoria = data.categoria;
    this._precio = data.precio;
    this._estado = data.estado_habitacion;
  }

  _getTemplate() {
    const newPopup = document
      .querySelector("#editarEstadoHabitacionPopup-template")
      .content.querySelector(".editar_estado_container")
      .cloneNode(true);
    return newPopup;
  }

  generatePopup() {
    this._popup = this._getTemplate();
    this._setEventListeners();
    return this._popup;
  }

  open() {
    document.querySelector(".popupEstadoHabitacion").classList.remove("hidden");
    document.querySelector(".popupEstadoHabitacion").classList.add("flex");
    document.querySelector(
      ".popupEstadoHabitacion"
    ).style = `top: calc((100vh - 558px) / 2); 
                                                    left: calc((100vw - 384px) / 2);`;

    document.querySelector(".overlay").classList.remove("hidden");
  }

  close() {
    document.querySelector(".popupCliente").classList.remove("flex");
    document.querySelector(".popupCliente").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");

    this._popup.closest(".editar_estado_container").remove();
  }

  _setEventListeners() {
    // Agregar el evento para el botón de enviar del formulario
    this._popup
      .querySelector("#editarEstadoHabitacionForm")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();

        const estadoId = this._popup.querySelector(
          "#selectEstadoHabitacion"
        ).value;
        apiHabitacionInstance
          .cambiarEstadoHabitacion(this._habitacionId, estadoId)
          .then(() => {
            const habitacionLista = document.querySelector("#roomList");
            habitacionLista.textContent = ""; // Limpiar la lista actual
            return apiHabitacionInstance
              .obtenerHabitaciones()
              .then((habitaciones) => {
                if (habitaciones && habitaciones.length > 0) {
                  habitaciones.forEach((habitacion) => {
                    habitacionLista.appendChild(
                      new HabitacionItem(habitacion).generateRoom()
                    );
                  });
                  this.close(); // Cerrar el popup después de crear el reserva
                  alert("Estado actualizado correctamente");
                } else {
                  const p = document.createElement("p");
                  p.classList.add(
                    "text-white",
                    "text-center",
                    "w-full",
                    "text-lg",
                    "font-bold"
                  );
                  p.textContent = "No hay Habitaciones.";
                  habitacionLista.appendChild(p);
                }
              });
          });
      });

    this._popup
      .querySelector("#closeEditarEstadoHabitacionButton")
      .addEventListener("click", () => {
        this.close();
      });

    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });

    document.querySelector(".overlay").addEventListener("click", () => {
      this.close();
    });
  }
}
