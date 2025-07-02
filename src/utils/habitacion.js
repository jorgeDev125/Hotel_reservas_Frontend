import { ApiHabitacion } from "../components/habitacion/ApiHabitacion";
import HabitacionItem from "../components/habitacion/HabitacionItem";
import HabitacionView from "../components/habitacion/HabitacionView";
import { apiInstanceConfig } from "./constants";

//crea instancia de la clase ApiHabitacion
// Esta instancia se utilizará para realizar peticiones a la API de clientes
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
