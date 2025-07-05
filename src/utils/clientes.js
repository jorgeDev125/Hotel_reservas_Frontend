import { ApiCliente } from "../components/cliente/ApiClientes";
import ClienteItem from "../components/cliente/ClienteItem";
import ClienteView from "../components/cliente/ClienteView";
import PopupCliente from "../components/cliente/PopupCliente";
import { apiInstanceConfig } from "./constants";

//crea instancia de la clase ApiCliente
// Esta instancia se utilizará para realizar peticiones a la API de clientes
export const apiClienteInstance = new ApiCliente(apiInstanceConfig);

export async function renderClienteView() {
  const clienteVista = new ClienteView().generateView();
  const clientesLista = clienteVista.querySelector("#clientesList");

  const cedula = localStorage.getItem("cedula_para_popup");
  if (cedula) {
    // Aquí tu lógica para abrir el popup y poner la cédula
    const popupCliente = new PopupCliente();
    const popup = popupCliente.generatePopup();
    popup.querySelector("#cedula").value = cedula;
    popupCliente.open();
    document.querySelector(".popupCliente").prepend(popup);
  }

  let usuarios = [];
  try {
    usuarios = await apiClienteInstance.obtenerClientes();
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }

  if (usuarios && usuarios.length > 0) {
    usuarios.forEach((usuario) => {
      clientesLista.appendChild(new ClienteItem(usuario).generateCustomer());
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
    p.textContent = "No hay clientes disponibles.";
    clientesLista.appendChild(p);
  }

  return clienteVista;
}
