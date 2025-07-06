// import { apiClienteInstance } from "../../utils/clientes";
// import { apiHabitacionInstance } from "../../utils/habitacion";
import { apiReservaInstance } from "../../utils/reserva";
import { formatCurrency, formatDateTime } from "../../utils/utils";
import ReservaItem from "./ReservaItem";
// import { formatCurrency } from "../../utils/utils";
// import PopupCliente from "../cliente/PopupCliente";
// import HabitacionItem from "../habitacion/HabitacionItem";
// import ReservaItem from "./ReservaItem";

export default class PopupDetalleReserva {
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
  }

  _getTemplate() {
    const newPopup = document
      .querySelector("#reservaDetallePopup-template")
      .content.querySelector(".detalleContainer")
      .cloneNode(true);
    return newPopup;
  }

  generatePopup() {
    this._popup = this._getTemplate();
    this._setEventListeners();

    return this._popup;
  }

  open() {
    document.querySelector(".popupDetalleReserva").classList.remove("hidden");
    document
      .querySelector(".popupDetalleReserva")
      .classList.add("flex", "top-5");
    document.querySelector(
      ".popupDetalleReserva"
    ).style = `left: calc((100vw - 448px) / 2);`;
    document.querySelector(".overlay").classList.remove("hidden");
    this._popup.querySelector("#reserva_numero").textContent = this._reserva_id;
    this._popup.querySelector("#reserva_fecha").textContent = formatDateTime(
      this._fecha_registro
    );
    this._popup.querySelector("#reserva_noches").textContent =
      this._numero_noches;
    this._popup.querySelector("#reserva_estado").textContent =
      this._estado_reserva;
    this._popup.querySelector("#cliente_cedula").textContent = this._cedula;
    this._popup.querySelector(
      "#cliente_nombre"
    ).textContent = `${this._nombre_cliente} ${this._apellido_cliente}`;
    this._popup.querySelector("#cliente_telefono").textContent =
      this._telefono_cliente;
    this._popup.querySelector("#habitacion_numero").textContent =
      this._numero_habitacion;
    this._popup.querySelector("#habitacion_categoria").textContent =
      this._categoria;
    this._popup.querySelector("#habitacion_precio").textContent =
      formatCurrency(this._precio_habitacion);
    this._popup.querySelector("#habitacion_estado").textContent =
      this._estado_habitacion;
    this._popup.querySelector("#precio_total").textContent = formatCurrency(
      this._precio_reserva
    );

    switch (this._estado_reserva) {
      case "Pendiente":
        this._popup
          .querySelector(".reserva_container")
          .classList.add("border-gray-500");
        this._popup
          .querySelector(".reservation__status")
          .classList.add("bg-gray-500");
        this._popup.querySelector("#btnCompletar").disabled = true;
        this._popup
          .querySelector("#btnCompletar")
          .classList.remove(
            "bg-lime-600",
            "hover:bg-lime-500",
            "cursor-pointer",
            "text-white"
          );
        this._popup
          .querySelector("#btnCompletar")
          .classList.add("bg-gray-600", "cursor-not-allowed", "text-gray-400");
        /*   this._element
          .querySelector(".reservation__icon")
          .classList.add("bg-gray-500");
        this._element.querySelector(".reservation__icon").src =
          "./src/images/pendiente.png"; */
        break;
      case "Activa":
        this._popup
          .querySelector(".reserva_container")
          .classList.add("border-amber-600");
        this._popup
          .querySelector(".reservation__status")
          .classList.add("bg-amber-600");
        this._popup.querySelector("#btnActivar").disabled = true;
        this._popup
          .querySelector("#btnActivar")
          .classList.remove(
            "bg-amber-600",
            "hover:bg-amber-500",
            "cursor-pointer",
            "text-white"
          );
        this._popup
          .querySelector("#btnActivar")
          .classList.add("bg-gray-600", "cursor-not-allowed", "text-gray-400");

        /* this._element
          .querySelector(".reservation__icon")
          .classList.add("bg-amber-600");
        this._element.querySelector(".reservation__icon").src =
          "./src/images/activa.png"; */

        break;
      case "Completada":
        this._popup
          .querySelector(".reserva_container")
          .classList.add("border-lime-600");
        this._popup
          .querySelector(".reservation__status")
          .classList.add("bg-lime-600");
        this._popup.querySelector("#btnActivar").disabled = true;
        this._popup
          .querySelector("#btnActivar")
          .classList.remove(
            "bg-amber-600",
            "hover:bg-amber-500",
            "cursor-pointer",
            "text-white"
          );
        this._popup
          .querySelector("#btnActivar")
          .classList.add("bg-gray-600", "cursor-not-allowed", "text-gray-400");

        this._popup.querySelector("#btnCompletar").disabled = true;
        this._popup
          .querySelector("#btnCompletar")
          .classList.remove(
            "bg-lime-600",
            "hover:bg-lime-500",
            "cursor-pointer",
            "text-white"
          );
        this._popup
          .querySelector("#btnCompletar")
          .classList.add("bg-gray-600", "cursor-not-allowed", "text-gray-400");

        this._popup.querySelector("#btnCancelar").disabled = true;
        this._popup
          .querySelector("#btnCancelar")
          .classList.remove(
            "bg-red-600",
            "hover:bg-red-500",
            "cursor-pointer",
            "text-white"
          );
        this._popup
          .querySelector("#btnCancelar")
          .classList.add("bg-gray-600", "cursor-not-allowed", "text-gray-400");
        /*   this._element
          .querySelector(".reservation__icon")
          .classList.add("bg-lime-600");
        this._element.querySelector(".reservation__icon").src =
          "./src/images/completada.png"; */
        break;
      case "Cancelada":
        this._popup
          .querySelector(".reserva_container")
          .classList.add("border-red-700");
        this._popup
          .querySelector(".reservation__status")
          .classList.add("bg-red-700");
        this._popup.querySelector("#btnActivar").disabled = true;
        this._popup
          .querySelector("#btnActivar")
          .classList.remove(
            "bg-amber-600",
            "hover:bg-amber-500",
            "cursor-pointer",
            "text-white"
          );
        this._popup
          .querySelector("#btnActivar")
          .classList.add("bg-gray-600", "cursor-not-allowed", "text-gray-400");

        this._popup.querySelector("#btnCompletar").disabled = true;
        this._popup
          .querySelector("#btnCompletar")
          .classList.remove(
            "bg-lime-600",
            "hover:bg-lime-500",
            "cursor-pointer",
            "text-white"
          );
        this._popup
          .querySelector("#btnCompletar")
          .classList.add("bg-gray-600", "cursor-not-allowed", "text-gray-400");

        this._popup.querySelector("#btnCancelar").disabled = true;
        this._popup
          .querySelector("#btnCancelar")
          .classList.remove(
            "bg-red-600",
            "hover:bg-red-500",
            "cursor-pointer",
            "text-white"
          );
        this._popup
          .querySelector("#btnCancelar")
          .classList.add("bg-gray-600", "cursor-not-allowed", "text-gray-400");
        /*  this._element
          .querySelector(".reservation__icon")
          .classList.add("bg-red-700");
        this._element.querySelector(".reservation__icon").src =
          "./src/images/no-disponible.png"; */
        break;
    }
  }

  close() {
    document.querySelector(".popupDetalleReserva").classList.remove("flex");
    document.querySelector(".popupDetalleReserva").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");

    this._popup.closest(".detalleContainer").remove();
  }

  _setEventListeners() {
    // Agregar el evento para botón de Activar la reservación
    this._popup.querySelector("#btnActivar").addEventListener("click", () => {
      apiReservaInstance
        .actualizarEstadoReservacion(this._reserva_id, { estadoId: 2 })
        .then(async () => {
          const reservasLista = document.querySelector("#reservasList");
          reservasLista.textContent = ""; // Limpiar la lista actual

          // Volver a cargar los reservas
          return apiReservaInstance.obtenerReservaciones().then((reservas) => {
            if (reservas && reservas.length > 0) {
              reservas.forEach((reserva) => {
                reservasLista.appendChild(
                  new ReservaItem(reserva).generateReserva()
                );
              });
              this.close(); // Cerrar el popup después de crear el reserva
              alert("Reservación activada correctamente");
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
          });
        });
    });

    //evento para boton de completar reservación
    this._popup.querySelector("#btnCompletar").addEventListener("click", () => {
      apiReservaInstance
        .actualizarEstadoReservacion(this._reserva_id, { estadoId: 3 })
        .then(async () => {
          const reservasLista = document.querySelector("#reservasList");
          reservasLista.textContent = ""; // Limpiar la lista actual

          // Volver a cargar los reservas
          return apiReservaInstance.obtenerReservaciones().then((reservas) => {
            if (reservas && reservas.length > 0) {
              reservas.forEach((reserva) => {
                reservasLista.appendChild(
                  new ReservaItem(reserva).generateReserva()
                );
              });
              this.close(); // Cerrar el popup después de crear el reserva
              alert("Reservación completada correctamente");
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
          });
        });
    });

    //evento para boton de cancelar reservación
    this._popup.querySelector("#btnCancelar").addEventListener("click", () => {
      apiReservaInstance
        .actualizarEstadoReservacion(this._reserva_id, { estadoId: 4 })
        .then(async () => {
          const reservasLista = document.querySelector("#reservasList");
          reservasLista.textContent = ""; // Limpiar la lista actual

          // Volver a cargar los reservas
          return apiReservaInstance.obtenerReservaciones().then((reservas) => {
            if (reservas && reservas.length > 0) {
              reservas.forEach((reserva) => {
                reservasLista.appendChild(
                  new ReservaItem(reserva).generateReserva()
                );
              });
              this.close(); // Cerrar el popup después de crear el reserva
              alert("Reservación cancelada correctamente");
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
          });
        });
    });

    //evento para activar funcion close
    this._popup
      .querySelector("#closeDetalleReserva")
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
