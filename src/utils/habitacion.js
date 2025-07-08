import { ApiHabitacion } from "../components/habitacion/ApiHabitacion";
import HabitacionItem from "../components/habitacion/HabitacionItem";
import HabitacionView from "../components/habitacion/HabitacionView";
import { apiInstanceConfig } from "./constants";

//crea instancia de la clase ApiHabitacion
// Esta instancia se utilizará para realizar peticiones a la API de habitaciones
export const apiHabitacionInstance = new ApiHabitacion(apiInstanceConfig);

export async function renderRoomView() {
  const habitacionVista = new HabitacionView().generateView();
  const habitacionLista = habitacionVista.querySelector("#roomList");

  let habitaciones = [];
  try {
    habitaciones = await apiHabitacionInstance.obtenerHabitaciones();
  } catch (error) {
    console.error("Error al cargar habitaciones:", error);
  }
  const habitacionesParaActivar = []
  habitaciones.map(habitacion => {
    if (habitacion.estado_habitacion === "En Limpieza") {
      habitacionesParaActivar.push(habitacion)
    }
  })
  if (habitacionesParaActivar.length === 0) {
    habitacionVista.querySelector("#activarHabitacionesButton").disabled = true
    habitacionVista.querySelector("#activarHabitacionesButton").classList.add("bg-gray-400" , "cursor-not-allowed")
  } else {
    habitacionVista.querySelector("#activarHabitacionesButton").classList.add("bg-blue-700", "hover:bg-blue-600", "cursor-pointer")
  }

  if (habitaciones && habitaciones.length > 0) {
    habitaciones.forEach((habitacion) => {
      habitacionLista.appendChild(new HabitacionItem(habitacion).generateRoom());
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

  return habitacionVista;
}
