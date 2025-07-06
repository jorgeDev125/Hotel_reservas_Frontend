import { ApiHabitacion } from "../components/habitacion/ApiHabitacion";
import EstadisticaItem from "../components/inicio/EstadisticaItem";
import InicioView from "../components/inicio/InicioView";
import { ApiReserva } from "../components/reserva/ApiReserva";
import { apiInstanceConfig } from "./constants";

export const apiReservaInstance = new ApiReserva(apiInstanceConfig);
export const apiHabitacionInstance = new ApiHabitacion(apiInstanceConfig);

export async function renderInicioView() {
  const inicioVista = new InicioView().generateView();

  try {
    let habitaciones =
      await apiHabitacionInstance.agruparHabitacionesPorEstado();
    await habitaciones.forEach((habitacion) => {
      const estadisticaItem = new EstadisticaItem(habitacion);
      const itemCard = estadisticaItem.generateCard();
      inicioVista.querySelector(".estadisticas_habitaciones").prepend(itemCard);
    });
  } catch (error) {
    console.error("Error al cargar habitaciones:", error);
  }

  try {
    let reservaciones = await apiReservaInstance.agruparReservasPorEstado();
    await reservaciones.forEach((reservacion) => {
      const estadisticaItem = new EstadisticaItem(reservacion);
      const itemCard = estadisticaItem.generateCard();
      inicioVista
        .querySelector(".estadisticas_reservaciones")
        .prepend(itemCard);
    });
  } catch (error) {
    console.error("Error al cargar reservaciones:", error);
  }
  return inicioVista;
}
