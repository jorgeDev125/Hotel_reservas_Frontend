import { ApiHabitacion } from "../components/habitacion/ApiHabitacion";
import InicioView from "../components/inicio/InicioView";
import { ApiReserva } from "../components/reserva/ApiReserva";
import { apiInstanceConfig } from "./constants";

export const apiReservaInstance = new ApiReserva(apiInstanceConfig);
export const apiHabitacionInstance = new ApiHabitacion(apiInstanceConfig);

export async function renderInicioView() {
  const inicioVista = new InicioView().generateView();

  try {
    let habitaciones = await apiHabitacionInstance.agruparHabitacionesPorEstado()
    habitaciones.forEach(habitacion => {
        //renderizar la card de estadisticas
        console.log(habitacion)
    });
    
        inicioVista.querySelector("#estadistica-disponibles").textContent = habitaciones[0].cantidad
        inicioVista.querySelector("#estadistica-reservadas").textContent = habitaciones[4].cantidad
        inicioVista.querySelector("#estadistica-ocupadas").textContent = habitaciones[1].cantidad
        inicioVista.querySelector("#estadistica-limpieza").textContent = habitaciones[3].cantidad
        inicioVista.querySelector("#estadistica-nodisponibles").textContent = habitaciones[2].cantidad
        console.log(habitaciones);
   
  } catch (error) {
    console.error("Error al cargar habitaciones:", error);
  }



  let reservaciones = [];
  try {
    reservaciones = await apiReservaInstance.actualizarEstadoReservacion();
  } catch (error) {
    console.error("Error al cargar reservaciones:", error);
  }

//   console.log(reservaciones);

  return inicioVista;
}
