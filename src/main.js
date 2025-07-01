import "./style.css";
import { ROUTER } from "./routes/router.js";
import { inicializarRutas } from "./routes/routes.js";
import { btnHome, btnRoom, btnReserve, btnCustomer } from "./utils/constants.js";



window.onload = async () => {
  await inicializarRutas(ROUTER);
  ROUTER.init();
  ROUTER.render(window.location.pathname.replace("/", "") || "home");
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
