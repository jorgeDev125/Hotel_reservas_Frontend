/* import { apiClienteInstance } from "../utils/clientes"; */

import { apiClienteInstance } from "../utils/clientes";
import PopupCliente from "./PopupCliente";

export default class ClienteItem {
  constructor(data) {
    this._clienteId = data.id;
    this._cedula = data.cedula;
    this._nombre = data.nombre;
    this._apellido = data.apellido;
    this._telefono = data.telefono || "";
    this._email = data.email || "";
  }

  //función para clonar la plantilla
  _getTemplate() {
    const newCard = document
      .querySelector("#clienteItem-template")
      .content.querySelector(".customer__item")
      .cloneNode(true);
    return newCard;
  }

  _setEventListeners() {
    // Agregar el evento para el botón de editar
    this._element
      .querySelector("#customer__edit-button")
      .addEventListener("click", () => {
        try {
          const popupCliente = new PopupCliente();
          const popup = popupCliente.generatePopup();
          //popup.querySelector("#clienteForm").id = "editClienteForm";
          popup.querySelector("#cedula").value = this._cedula;
          popup.querySelector("#nombre").value = this._nombre;
          popup.querySelector("#apellido").value = this._apellido;
          popup.querySelector("#telefono").value = this._telefono;
          popup.querySelector("#email").value = this._email;
          popup.querySelector(".save_button").textContent = "Guardar Cambios";
          popup.querySelector(".form_title").textContent = "Actualizar Cliente";
          popupCliente.open();

          // Agrega el contenido del popup con los datos del cliente
          document.querySelector(".popupCliente").prepend(popup);

          // Elimina todos los event listeners previos de submit en el formulario
          const oldForm = popup.querySelector("#clienteForm");
          const newForm = oldForm.cloneNode(true);
          oldForm.parentNode.replaceChild(newForm, oldForm);

          newForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const formData = new FormData(newForm);
            const clienteData = {
              cedula: formData.get("cedula"),
              nombre: formData.get("nombre"),
              apellido: formData.get("apellido"),
              telefono: formData.get("telefono") || null,
              email: formData.get("email") || null,
            };

            // reactualizar la lista de clientes
            const clientesLista = document.querySelector("#clientesList");
            apiClienteInstance
              .actualizarCliente(this._cedula, clienteData)
              .then(() => {
                clientesLista.innerHTML = ""; // Limpiar la lista actual

                // Volver a cargar los clientes
                return apiClienteInstance.obtenerClientes();
              })
              .then((clientes) => {
                if (clientes && clientes.length > 0) {
                  clientes.forEach((cliente) => {
                    clientesLista.appendChild(
                      new ClienteItem(cliente).generateCustomer()
                    );
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
                popupCliente.close(); // Cerrar el popup después de actualizar el cliente
              })
              .catch((error) => {
                console.error("Error al actualizar cliente:", error);
              });
          });
        } catch (error) {
          console.error("Error al obtener el cliente:", error);
        }
      });
    // Agregar el evento para el botón de eliminar
    this._element
      .querySelector("#customer__delete-button")
      .addEventListener("click", () => {
        console.log("Eliminar: " + this._clienteId);
      });
  }

  generateCustomer() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.id = this._clienteId;
    this._element.querySelector(
      ".customer__card-name"
    ).textContent = `${this._nombre} ${this._apellido}`;
    this._element.querySelector(".customer__card-cedula").textContent =
      this._cedula;
    this._element.querySelector(".customer__card-telefono").textContent =
      this._telefono;
    this._element.querySelector(".customer__card-email").textContent =
      this._email;

    return this._element;
  }
}
