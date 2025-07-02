import "./style.css";
import { ROUTER } from "./routes/router.js";
import { inicializarRutas } from "./routes/routes.js";
import {
  btnHome,
  btnRoom,
  btnReserve,
  btnCustomer,
} from "./utils/constants.js";

window.onload = async () => {
  await inicializarRutas(ROUTER);
  ROUTER.init();
  // Obtiene la ruta limpia, sin barra inicial, queries ni parámetros
  let route =
    window.location.pathname.replace(/^\//, "").split(/[/?#]/)[0] || "home";
  if (!route) {
    window.history.replaceState({}, "", "/home");
    route = "home";
  }
  setActiveSidebarButton(route);
  ROUTER.render(route);
};

function setActiveSidebarButton(route) {
  const buttons = [btnHome, btnRoom, btnReserve, btnCustomer];
  buttons.forEach((btn) =>
    btn.classList.remove("bg-gray-800", "font-bold")
  );
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

btnHome.addEventListener("click", () => {
  setActiveSidebarButton("home");
  ROUTER.load("home");
});
btnRoom.addEventListener("click", () => {
  setActiveSidebarButton("habitaciones");
  ROUTER.load("habitaciones");
});
btnReserve.addEventListener("click", () => {
  setActiveSidebarButton("reservas");
  ROUTER.load("reservas");
});
btnCustomer.addEventListener("click", () => {
  setActiveSidebarButton("clientes");
  ROUTER.load("clientes");
});
