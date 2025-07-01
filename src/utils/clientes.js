import { ApiCliente } from "../components/ApiClientes";
import Cliente from "../components/Cliente";
import { apiInstanceConfig } from "./constants";

//crea instancia de la clase ApiCliente
// Esta instancia se utilizará para realizar peticiones a la API de clientes
export const apiClienteInstance = new ApiCliente(apiInstanceConfig);

// Carga los usuarios de la base de datos
  let usuarios = [];
  try {
    usuarios = await apiClienteInstance.obtenerClientes();
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }

export function renderClienteView() {
    // Crea un contenedor para la lista de clientes
    // Este contenedor contendrá todos los clientes obtenidos de la API
    let clientesLista = document.createElement("div");
    clientesLista.classList.add("flex", "flex-row", "flex-wrap", "gap-3");

    // Crea un botón para agregar un nuevo cliente
    let addClienteButton = document.createElement("button");
    addClienteButton.classList.add(
      "bg-blue-700",
      "text-white",
      "px-4",
      "py-2",
      "rounded",
      "hover:bg-blue-600",
      "absolute",
      "top-6",
      "right-6",
      "z-10"      
    );
    addClienteButton.textContent = "Agregar Cliente";
    addClienteButton.addEventListener("click", () => {
      console.log("Soy un boton de agregar")
    });
    
  // Verifica si hay usuarios y los agrega a la lista de clientes
  // Si no hay usuarios, muestra un mensaje indicando que no hay clientes disponibles
    if (usuarios && usuarios.length > 0) {
      usuarios.forEach((usuario) => {
      clientesLista.appendChild(new Cliente(usuario).generateCustomer());
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
  
  // Crea un contenedor principal para la vista de clientes
  let vistaClientes = document.createElement("div");
  vistaClientes.classList.add("p-4", "bg-gray-800", "rounded-lg", "gap-4", "flex", "flex-col");
  const h1 = document.createElement("h1");
  h1.classList.add("text-2xl", "font-bold", "mb-4", "text-white");
  h1.textContent = "Clientes";
  vistaClientes.appendChild(h1);
  vistaClientes.appendChild(addClienteButton);
  vistaClientes.appendChild(clientesLista);
  return vistaClientes;
}