// routes.js



import { renderClienteView } from "../utils/clientes";

export function _getTemplateRooms() {
  const newCardRoom = document
    .querySelector("#card-template")
    .content.querySelector(".elements__card")
    .cloneNode(true);
  return newCardRoom;
}

export async function inicializarRutas(ROUTER) {
  ROUTER.add("home", "<h1>Inicio</h1>");
  ROUTER.add("habitaciones", _getTemplateRooms());
  ROUTER.add("reservas", "<h1>Reservas</h1>");
  ROUTER.add("clientes", renderClienteView());
}
