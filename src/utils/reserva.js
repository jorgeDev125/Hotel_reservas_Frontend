import { ApiReserva } from "../components/reserva/ApiReserva";
import ReservaItem from "../components/reserva/ReservaItem";
import ReservaView from "../components/reserva/ReservaView";
import { apiInstanceConfig } from "./constants";

//crea instancia de la clase ApiReserva
// Esta instancia se utilizará para realizar peticiones a la API de reservas
export const apiReservaInstance = new ApiReserva(apiInstanceConfig);

export async function renderReservaView() {
  const reservaVista = new ReservaView().generateView();
  const reservaLista = reservaVista.querySelector("#reservasList");

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
