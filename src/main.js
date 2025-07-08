import "./style.css";
import { ROUTER } from "./routes/router.js";
import { inicializarRutas } from "./routes/routes.js";
import { mostrarSidebar, ocultarSidebar, setActiveSidebarButton } from "./utils/sidebar.js";

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
  mostrarSidebar();
  ocultarSidebar();
  ROUTER.render(route);
};

