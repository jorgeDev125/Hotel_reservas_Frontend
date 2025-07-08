import { ROUTER } from "../routes/router";
import {
  menuDesplegable,
  btnHome,
  btnRoom,
  btnReserve,
  btnCustomer,
  overlay,
  sidebar,
  closeSidebarButton
} from "./constants";

export function setActiveSidebarButton(route) {
  const buttons = [btnHome, btnRoom, btnReserve, btnCustomer];
  buttons.forEach((btn) => btn.classList.remove("bg-gray-800", "font-bold"));
  switch (route) {
    case "home":
      btnHome.classList.add("bg-gray-800", "font-bold");
      break;
    case "habitaciones":
      btnRoom.classList.add("bg-gray-800", "font-bold");
      break;
    case "reservas":
      btnReserve.classList.add("bg-gray-800", "font-bold");
      break;
    case "clientes":
      btnCustomer.classList.add("bg-gray-800", "font-bold");
      break;
  }
}

export function ocultarSidebar() {
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("flex");
    sidebar.classList.add("hidden");
    overlay.classList.add("hidden");
    menuDesplegable.classList.remove("hidden");
  });
}

export function mostrarSidebar() {
  menuDesplegable.addEventListener("click", () => {
    sidebar.classList.remove("hidden");
    sidebar.classList.add("flex");
    overlay.classList.remove("hidden");
    menuDesplegable.classList.add("hidden");
  });
}

closeSidebarButton.addEventListener("click", () => {
  sidebar.classList.remove("flex");
  sidebar.classList.add("hidden");
  overlay.classList.add("hidden");
  menuDesplegable.classList.remove("hidden");
})

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
  sidebar.classList.remove("flex");
  sidebar.classList.add("hidden");
  overlay.classList.add("hidden");
  menuDesplegable.classList.remove("hidden");
}
})

btnHome.addEventListener("click", () => {
  setActiveSidebarButton("home");
  sidebar.classList.remove("flex");
  sidebar.classList.add("hidden");
  overlay.classList.add("hidden");
  menuDesplegable.classList.remove("hidden");
  ROUTER.load("home");
});

btnRoom.addEventListener("click", () => {
  setActiveSidebarButton("habitaciones");
  sidebar.classList.remove("flex");
  sidebar.classList.add("hidden");
  overlay.classList.add("hidden");
  menuDesplegable.classList.remove("hidden");
  ROUTER.load("habitaciones");
});

btnReserve.addEventListener("click", () => {
  setActiveSidebarButton("reservas");
  sidebar.classList.remove("flex");
  sidebar.classList.add("hidden");
  overlay.classList.add("hidden");
  menuDesplegable.classList.remove("hidden");
  ROUTER.load("reservas");
});

btnCustomer.addEventListener("click", () => {
  setActiveSidebarButton("clientes");
  sidebar.classList.remove("flex");
  sidebar.classList.add("hidden");
  overlay.classList.add("hidden");
  menuDesplegable.classList.remove("hidden");
  ROUTER.load("clientes");
});
