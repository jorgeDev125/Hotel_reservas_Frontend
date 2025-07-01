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
  ROUTER.add("home", () => {
    const h1 = document.createElement("h1");
    h1.textContent = "Inicio";
    h1.classList.add("text-2xl", "font-bold", "text-white", "mb-4");
    return h1;
  });
  ROUTER.add("habitaciones", _getTemplateRooms);
  ROUTER.add("reservas", () => {
    const h1 = document.createElement("h1");
    h1.textContent = "Reservas";
    h1.classList.add("text-2xl", "font-bold", "text-white", "mb-4");
    return h1;
  });
  ROUTER.add("clientes", async () => await renderClienteView());
}
