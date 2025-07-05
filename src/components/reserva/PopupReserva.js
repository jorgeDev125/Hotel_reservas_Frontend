import { apiClienteInstance } from "../../utils/clientes";
import { apiHabitacionInstance } from "../../utils/habitacion";
import { apiReservaInstance } from "../../utils/reserva";
import { formatCurrency } from "../../utils/utils";
import PopupCliente from "../cliente/PopupCliente";
import ReservaItem from "./ReservaItem";

export default class PopupReserva {
  constructor() {}

  _getTemplate() {
    const newPopup = document
      .querySelector("#reservaPopup-template")
      .content.querySelector(".reserva__form")
      .cloneNode(true);
    return newPopup;
  }

  generatePopup() {
    this._popup = this._getTemplate();
    this._setEventListeners();

    try {
      const select = this._popup.querySelector("#selectHabitacion");
      apiHabitacionInstance
        .buscarHabitacionesPorEstado(1)
        .then((habitaciones) => {
          habitaciones.forEach((h) => {
            const option = document.createElement("option");
            option.value = h.habitacion_id;
            option.textContent = `Hab. ${h.numero}`;
            option.setAttribute("data-numero", h.numero);
            option.setAttribute("data-categoria", h.categoria);
            option.setAttribute("data-precio", h.precio);
            select.appendChild(option);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}

    return this._popup;
  }

  open() {
    document.querySelector(".popupReserva").classList.remove("hidden");
    document.querySelector(".popupReserva").classList.add("flex", "top-5");
    document.querySelector(
      ".popupReserva"
    ).style = `left: calc((100vw - 448px) / 2);`;
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
    //agrega el evento para buscar cliente por cédula
    this._popup
      .querySelector("#buscarClienteButton")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        const formData = new FormData(
          this._popup.querySelector("#reservaForm")
        );

        if (!formData.get("cedula")) {
          alert("Ingresa un número de cédula");
          return;
        }
        //obtiene los datos de la base de datos y los renderiza
        apiClienteInstance
          .obtenerClientePorCedula(formData.get("cedula"))
          .then((cliente) => {
            this._popup.querySelector("#cliente_cedula").textContent =
              cliente[0].cedula;
            this._popup.querySelector(
              "#cliente_nombre"
            ).textContent = `${cliente[0].nombre} ${cliente[0].apellido}`;
            this._popup.querySelector("#cliente_telefono").textContent =
              cliente[0].telefono;
            this._popup.querySelector("#cliente_email").textContent =
              cliente[0].email;
            this._popup.querySelector("#cliente_id").value = cliente[0].id;
          })
          .catch((error) => {

            if (window.confirm(error + "¿Quieres crear el usuario?")) {
              
              this.close()
              localStorage.setItem("cedula_para_popup", formData.get("cedula"));
              // Redirige a /clientes
              window.location.href = "/clientes";
              
            } 
          });
      });

    //evento para seleccionar habitación y renderizar
    this._popup
      .querySelector("#selectHabitacion")
      .addEventListener("change", (event) => {
        const select = event.target;
        const selected = select.options[select.selectedIndex];
        const numero = selected.getAttribute("data-numero") || "_____";
        const categoria =
          selected.getAttribute("data-categoria") || "__________";
        const precio = selected.getAttribute("data-precio") || "_______";

        // Actualiza el resumen
        this._popup.querySelector("#habitacion_numero").textContent = numero;
        this._popup.querySelector("#habitacion_categoria").textContent =
          categoria;
        this._popup.querySelector("#habitacion_precio").textContent =
          formatCurrency(precio);
        this._popup.querySelector("#habitacion_id").value = selected.value;
      });

    //evento para el select de las noches
    this._popup
      .querySelector("#numero_noches")
      .addEventListener("change", (event) => {
        const selected = event.target.value;

        // Actualiza el resumen
        this._popup.querySelector("#resumen_noches").value = selected;
      
      });

    //evento para calcular precio total de reservación
    const selectHabitacion = this._popup.querySelector("#selectHabitacion");
    const inputNoches = this._popup.querySelector("#numero_noches");
    const spanPrecioTotal = this._popup.querySelector("#precio_total");

    function calcularPrecioTotal() {
      // Obtiene la opción seleccionada
      const selected = selectHabitacion.options[selectHabitacion.selectedIndex];
      const precioHabitacion = Number(selected.getAttribute("data-precio")) || 0;
      const numeroNoches = Number(inputNoches.value) || 0;
      const precioTotal = formatCurrency(precioHabitacion * numeroNoches);

      // Formatea el precio en COP sin decimales
      spanPrecioTotal.textContent = precioTotal;
    }

    // Escucha cambios en ambos campos
    selectHabitacion.addEventListener("input", calcularPrecioTotal);
    inputNoches.addEventListener("input", calcularPrecioTotal);


    // Agregar el evento para el botón de enviar del formulario
    this._popup
      .querySelector("#reservaForm")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const formData = new FormData(
          this._popup.querySelector("#reservaForm")
        );
        const reservaData = {
          clienteId: formData.get("cliente_id"),
          numeroNoches: formData.get("resumen_noches"),
          habitacionId: formData.get("habitacion_id"),
        };

        // reactualizar la lista de reservas
        const reservasLista = document.querySelector("#reservasList");
        apiReservaInstance
          .crearReservacion(reservaData)
          .then(() => {
            reservasLista.textContent = ""; // Limpiar la lista actual

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
              this.close(); // Cerrar el popup después de crear el reserva
              alert("Reserva creada exitosamente");
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
