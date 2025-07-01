import { ApiCliente } from "../components/ApiClientes";
import ClienteItem from "../components/ClienteItem";
import ClienteView from "../components/ClienteView";
import { apiInstanceConfig } from "./constants";


//crea instancia de la clase ApiCliente
// Esta instancia se utilizará para realizar peticiones a la API de clientes
export const apiClienteInstance = new ApiCliente(apiInstanceConfig);

// Carga inicial de usuarios desde la API
  let usuarios = [];
  try {
    usuarios = await apiClienteInstance.obtenerClientes();
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }

export function renderClienteView() {
  
  const clienteVista = new ClienteView().generateView();
  const clientesLista = clienteVista.querySelector("#clientesList")

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