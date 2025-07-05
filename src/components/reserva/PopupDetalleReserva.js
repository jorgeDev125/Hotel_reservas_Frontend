// import { apiClienteInstance } from "../../utils/clientes";
// import { apiHabitacionInstance } from "../../utils/habitacion";
// import { apiReservaInstance } from "../../utils/reserva";
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
    document.querySelector(".popupDetalleReserva").classList.add("flex", "top-5");
    document.querySelector(
      ".popupDetalleReserva"
    ).style = `left: calc((100vw - 448px) / 2);`;
    document.querySelector(".overlay").classList.remove("hidden");

    const cedula = localStorage.getItem("cedula_para_popup");
    if (cedula) {
      const cedulaInput = this._popup.querySelector("#cedula");
      const selectHabitacionInput =
        this._popup.querySelector("#selectHabitacion");
      cedulaInput.value = cedula;
      // Autoenfocar el input de cédula cuando se abre el modal
      setTimeout(() => {
        if (selectHabitacionInput) selectHabitacionInput.focus();
      }, 0);
    } else {
      // Autoenfocar el input de cédula cuando se abre el modal
      setTimeout(() => {
        const cedulaInput = this._popup.querySelector("#cedula");
        if (cedulaInput) cedulaInput.focus();
      }, 0);
    }
  }

  close() {
    document.querySelector(".popupDetalleReserva").classList.remove("flex");
    document.querySelector(".popupDetalleReserva").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");

    this._popup.closest(".detalleContainer").remove();
  }

  _setEventListeners() {
    
    // Agregar el evento para el botón de enviar del formulario
  /*   this._popup
      .querySelector("#reservaForm")
      .addEventListener("submit", (evt) => { }); */

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
