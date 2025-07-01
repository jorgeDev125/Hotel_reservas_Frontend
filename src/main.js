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
  ROUTER.render(route);
};

btnHome.addEventListener("click", () => {
  ROUTER.load("home");
});
btnRoom.addEventListener("click", () => {
  ROUTER.load("habitaciones");
});
btnReserve.addEventListener("click", () => {
  ROUTER.load("reservas");
});
btnCustomer.addEventListener("click", () => {
  ROUTER.load("clientes");
});
