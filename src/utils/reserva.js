import { ApiReserva } from "../components/reserva/ApiReserva";
import PopupReserva from "../components/reserva/PopupReserva";
import ReservaItem from "../components/reserva/ReservaItem";
import ReservaView from "../components/reserva/ReservaView";
import { apiClienteInstance } from "./clientes";
import { apiInstanceConfig } from "./constants";

//crea instancia de la clase ApiReserva
// Esta instancia se utilizará para realizar peticiones a la API de reservas
export const apiReservaInstance = new ApiReserva(apiInstanceConfig);

export async function renderReservaView() {
  const reservaVista = new ReservaView().generateView();
  const reservaLista = reservaVista.querySelector("#reservasList");

  const cedula = localStorage.getItem("cedula_para_popup");
    if (cedula) {
      // Aquí tu lógica para abrir el popup y poner la cédula
      const popupReserva = new PopupReserva();
      const popup = popupReserva.generatePopup();
      popup.querySelector("#cedula").value = cedula;
      apiClienteInstance
                .obtenerClientePorCedula(cedula)
                .then((cliente) => {
                  popup.querySelector("#cliente_cedula").textContent =
                    cliente[0].cedula;
                  popup.querySelector(
                    "#cliente_nombre"
                  ).textContent = `${cliente[0].nombre} ${cliente[0].apellido}`;
                  popup.querySelector("#cliente_telefono").textContent =
                    cliente[0].telefono;
                  popup.querySelector("#cliente_email").textContent =
                    cliente[0].email;
                  popup.querySelector("#cliente_id").value = cliente[0].id;
                })
                .catch((error) => {console.log(error)})
      popupReserva.open();
      document.querySelector(".popupReserva").prepend(popup);
  
      // Limpia el valor para que no se repita la acción en futuros reloads
      localStorage.removeItem("cedula_para_popup");
    }

    const habitacion = JSON.parse(localStorage.getItem("habitacion_para_popup"));
      if (habitacion) {
        // Aquí tu lógica para abrir el popup y poner la habitacion
        console.log(habitacion)
        const popupReserva = new PopupReserva();
        const popup = popupReserva.generatePopup();
        popup.querySelector("#habitacion_numero").textContent = habitacion.numero;
        popup.querySelector("#habitacion_categoria").textContent = habitacion.categoria;
        popup.querySelector("#habitacion_precio").textContent = habitacion.precio;
        popupReserva.open();
        document.querySelector(".popupReserva").prepend(popup);
    
        // Limpia el valor para que no se repita la acción en futuros reloads
       localStorage.removeItem("habitacion_para_popup");
  }

  let reservas = [];
  try {
    reservas = await apiReservaInstance.obtenerReservaciones();
  } catch (error) {
    console.error("Error al cargar reservas:", error);
  }

  if (reservas && reservas.length > 0) {
    reservas.forEach((reserva) => {
      reservaLista.appendChild(new ReservaItem(reserva).generateReserva());
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
    p.textContent = "No hay reservaciones disponibles.";
    reservaLista.appendChild(p);
  }

  return reservaVista;
}
