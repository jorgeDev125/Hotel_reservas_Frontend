// routes.js

import { renderClienteView } from "../utils/clientes";
import { renderRoomView } from "../utils/habitacion";
import { renderReservaView } from "../utils/reserva";



export async function inicializarRutas(ROUTER) {
  ROUTER.add("home", () => {
    const h1 = document.createElement("h1");
    h1.textContent = "Inicio";
    h1.classList.add("text-2xl", "font-bold", "text-white", "mb-4");
    return h1;
  });
  ROUTER.add("habitaciones", async () => await renderRoomView());
  ROUTER.add("reservas", async () => await renderReservaView());
  ROUTER.add("clientes", async () => await renderClienteView());
}
