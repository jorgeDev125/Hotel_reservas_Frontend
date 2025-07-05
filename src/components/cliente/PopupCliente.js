import { apiClienteInstance } from "../../utils/clientes";
import PopupReserva from "../reserva/PopupCrearReserva";
import ClienteItem from "./ClienteItem";

export default class PopupCliente {
  constructor() {}

  _getTemplate() {
    const newPopup = document
      .querySelector("#clientePopup-template")
      .content.querySelector(".cliente__form")
      .cloneNode(true);
    return newPopup;
  }

  generatePopup() {
    this._popup = this._getTemplate();
    this._setEventListeners();
    return this._popup;
  }

  open() {
    document.querySelector(".popupCliente").classList.remove("hidden");
    document.querySelector(".popupCliente").classList.add("flex");
    document.querySelector(
      ".popupCliente"
    ).style = `top: calc((100vh - 558px) / 2); 
                                                    left: calc((100vw - 384px) / 2);`;

    document.querySelector(".overlay").classList.remove("hidden");
    // Autoenfocar el input de cédula cuando se abre el modal
    const cedula = localStorage.getItem("cedula_para_popup");
    if (cedula) {
      const cedulaInput = this._popup.querySelector("#cedula");
      const nombreInput = this._popup.querySelector("#nombre");
      cedulaInput.value = cedula;
      setTimeout(() => {
        if (nombreInput) nombreInput.focus();
      }, 0);
    } else {
      setTimeout(() => {
        const cedulaInput = this._popup.querySelector("#cedula");
        if (cedulaInput) cedulaInput.focus();
      }, 0);
    }
  }

  close() {
    document.querySelector(".popupCliente").classList.remove("flex");
    document.querySelector(".popupCliente").classList.add("hidden");
    document.querySelector(".overlay").classList.add("hidden");

    this._popup.closest(".cliente__form").remove();
  }

  _setEventListeners() {
    // Agregar el evento para el botón de enviar del formulario
    this._popup
      .querySelector("#clienteForm")
      .addEventListener("submit", (evt) => {
        evt.preventDefault();
        const formData = new FormData(
          this._popup.querySelector("#clienteForm")
        );
        const clienteData = {
          cedula: formData.get("cedula"),
          nombre: formData.get("nombre"),
          apellido: formData.get("apellido"),
          telefono: formData.get("telefono") || null,
          email: formData.get("email") || null,
        };

        const cedulaStorage = localStorage.getItem("cedula_para_popup");

        apiClienteInstance
          .crearCliente(clienteData)
          .then(() => {
            if (!cedulaStorage) {
              // reactualizar la lista de clientes
              const clientesLista = document.querySelector("#clientesList");
              clientesLista.textContent = ""; // Limpiar la lista actual

              // Volver a cargar los clientes
              return apiClienteInstance.obtenerClientes().then((clientes) => {
                if (clientes && clientes.length > 0) {
                  clientes.forEach((cliente) => {
                    clientesLista.appendChild(
                      new ClienteItem(cliente).generateCustomer()
                    );
                  });
                  this.close(); // Cerrar el popup después de crear el cliente
                  alert("Cliente creado exitosamente");
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
              });
            } else {
              // Aquí tu lógica para abrir el popup y poner la cédula
              const popupReserva = new PopupReserva();
              const popup = popupReserva.generatePopup();
              popup.querySelector("#cedula").value = cedulaStorage;
              apiClienteInstance
                .obtenerClientePorCedula(cedulaStorage)
                .then((cliente) => {
                  popup.querySelector("#cliente_cedula").textContent =
                    cliente[0].cedula;
                  popup.querySelector(
                    "#cliente_nombre"
                  ).textContent = `${cliente[0].nombre} ${cliente[0].apellido}`;
                  popup.querySelector("#cliente_telefono").textContent =
                    cliente[0].telefono;
                  popup.querySelector("#cliente_email").textContent =
                    cliente[0].email;
                  popup.querySelector("#cliente_id").value = cliente[0].id;
                  this.close();
                  alert("Cliente creado exitosamente");
                })
                .then(() => {
                  popupReserva.open();
                  document.querySelector(".popupReserva").prepend(popup);
                  // Limpia el valor para que no se repita la acción en futuros reloads
                  localStorage.removeItem("cedula_para_popup");
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });

    //revisa si hay cedula en localStorage para funcionalidad de cerrar
    if (localStorage.getItem("cedula_para_popup")) {
      this._popup
        .querySelector("#closeClienteFormButton")
        .addEventListener("click", () => {
          localStorage.removeItem("cedula_para_popup");
          this.close();
        });

      document.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          localStorage.removeItem("cedula_para_popup");
          this.close();
        }
      });

      document.querySelector(".overlay").addEventListener("click", () => {
        localStorage.removeItem("cedula_para_popup");
        this.close();
      });
    } else {
      this._popup
        .querySelector("#closeClienteFormButton")
        .addEventListener("click", () => this.close());

      document.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          this.close();
        }
      });

      document.querySelector(".overlay").addEventListener("click", () => {
        this.close();
      });
    }
  }
}
