import { apiReservaInstance } from "../../utils/reserva";
import ReservaItem from "./ReservaItem";

export default class PopupReserva {
  constructor() {}

  _getTemplate() {
    const newPopup = document
      .querySelector("#reservaForm-template")
      .content.querySelector(".reserva__form")
      .cloneNode(true);
    return newPopup;
  }

  generatePopup() {
    this._popup = this._getTemplate();
    this._setEventListeners();
    return this._popup;
  }

  open() {
    document.querySelector(".popupReserva").classList.remove("hidden");
    document.querySelector(".popupReserva").classList.add("flex");
    document.querySelector(".overlay").classList.remove("hidden");
    // Autoenfocar el input de cédula cuando se abre el modal
    setTimeout(() => {
      const cedulaInput = document.querySelector(".popupReserva #cedula");
      if (cedulaInput) cedulaInput.focus();
    }, 0);
  }

  close() {
    document.querySelector(".popupReserva").classList.remove("flex");
    document.querySelector(".popupReserva").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");

    this._popup.closest(".reserva__form").remove();
  }

  _setEventListeners() {
    // Agregar el evento para el botón de enviar del formulario
    this._popup
      .querySelector("#reservaForm")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const formData = new FormData(
          this._popup.querySelector("#reservaForm")
        );
        const reservaData = {
          clienteId: formData.get("cedula"),
          numeroNoches: formData.get("noches"),
          habitacionId: formData.get("habitacion")
        };
        

        // reactualizar la lista de reservas
        const reservasLista = document.querySelector("#reservasList");
        apiReservaInstance
          .crearReservacion(reservaData)
          .then(() => {
            reservasLista.innerHTML = ""; // Limpiar la lista actual

            // Volver a cargar los reservas
            return apiReservaInstance.obtenerReservaciones();
          })
          .then((reservas) => {
            if (reservas && reservas.length > 0) {
              reservas.forEach((reserva) => {
                reservasLista.appendChild(
                  new ReservaItem(reserva).generateReserva()
                );
              });
            } else {
              const p = document.createElement("p");
              p.classList.add(
                "text-white",
                "text-center",
                "w-full",
                "text-lg",
                "font-bold"
              );
              p.textContent = "No hay reservacioness disponibles.";
              reservasLista.appendChild(p);
            }
            this.close(); // Cerrar el popup después de crear el reserva
            alert("Reserva creada exitosamente");
          })
          .catch((error) => {
            alert(error);
          });
      });

    this._popup
      .querySelector("#closeReservaFormButton")
      .addEventListener("click", () => this.close());

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
