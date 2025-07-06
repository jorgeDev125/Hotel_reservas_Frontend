import { apiHabitacionInstance } from "../../utils/habitacion";
import { formatCurrency } from "../../utils/utils";
import PopupCearReserva from "../reserva/PopupCrearReserva";

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
    // Agregar el evento para abrir el popup de reserva

    this._element.querySelector("#agregarReservaButton").addEventListener("click", () => {
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
          popup.querySelector("#habitacion_precio").textContent =
            formatCurrency(this._precio);
          popup.querySelector("#habitacion_id").value = this._habitacionId;
          popupReserva.open();
          document.querySelector(".popupReserva").prepend(popup);
    })

    this._element.querySelector(".room-status__icon").addEventListener("click", () => {
      switch (this._estado) {
        case "Disponible":
          console.log("disponible")
          /* localStorage.setItem(
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
          popup.querySelector("#habitacion_precio").textContent =
            formatCurrency(this._precio);
          popup.querySelector("#habitacion_id").value = this._habitacionId;
          popupReserva.open();
          document.querySelector(".popupReserva").prepend(popup); */
          break;
        case "Reservada":
          alert("La habitación está reservada");
          break;

        case "Ocupada":
          alert("La habitación está ocupada");
          break;
        case "En Limpieza":
          if (window.confirm("¿Quieres activar la habitación?")) {
            // El usuario hizo clic en "Aceptar"
            apiHabitacionInstance.cambiarEstadoHabitacion(this._habitacionId, 1)
            //refrescar la página
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
          } 
          break;
        case "No Disponible":
            if (window.confirm("¿Quieres activar la habitación?")) {
            // El usuario hizo clic en "Aceptar"
            apiHabitacionInstance.cambiarEstadoHabitacion(this._habitacionId, 1)
            //refrescar la página
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
          } 

          break;
      }
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
          "./src/images/disponible.png";
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
          "./src/images/disponible.png";
        this._element.querySelector("#agregarReservaButton").classList.add("hidden")
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
          "./src/images/ocupada.png";
        this._element.querySelector("#agregarReservaButton").classList.add("hidden")
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
          "./src/images/limpieza.png";
        this._element.querySelector("#agregarReservaButton").classList.add("hidden")
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
          "./src/images/no-disponible.png";
        this._element.querySelector("#agregarReservaButton").classList.add("hidden")
        break;
    }

    return this._element;
  }
}
