// routes.js

import { renderClienteView } from "../utils/clientes";
import { renderRoomView } from "../utils/habitacion";
import { renderInicioView } from "../utils/inicio";
import { renderReservaView } from "../utils/reserva";



export async function inicializarRutas(ROUTER) {
  ROUTER.add("home", async () => await renderInicioView());
  ROUTER.add("habitaciones", async () => await renderRoomView());
  ROUTER.add("reservas", async () => await renderReservaView());
  ROUTER.add("clientes", async () => await renderClienteView());
}
