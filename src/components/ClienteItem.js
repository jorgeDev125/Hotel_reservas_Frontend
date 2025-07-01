/* import { apiClienteInstance } from "../utils/clientes"; */

export default class ClienteItem {
    constructor(data) {
        this._clienteId = data.id;
        this._cedula = data.cedula;
        this._nombre = data.nombre;
        this._apellido = data.apellido;
        this._telefono = data.telefono || "No registrado";
        this._email = data.email || "No registrado";
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
            console.log("Soy un boton de editar");
            /* try {
                apiClienteInstance.obtenerClientePorId(this._cedula)
                .then((cliente) => {
                    // Aquí puedes manejar la lógica para editar el cliente
                    console.log("Cliente obtenido:", cliente);
                    // Por ejemplo, podrías abrir un modal con los datos del cliente
                    const modal = document.querySelector("#edit-customer-modal");
                    modal.querySelector("#edit-customer-id").value = cliente.id;
                    modal.querySelector("#edit-customer-cedula").value = cliente.cedula;
                    modal.querySelector("#edit-customer-nombre").value = cliente.nombre;
                    modal.querySelector("#edit-customer-apellido").value = cliente.apellido;
                    modal.querySelector("#edit-customer-telefono").value = cliente.telefono || "";
                    modal.querySelector("#edit-customer-email").value = cliente.email || "";
                    modal.classList.add("is-active");
                    // Aquí podrías agregar un evento para guardar los cambios
                    modal.querySelector("#save-changes-button").addEventListener("click", () => {
                        const updatedCliente = {
                            id: modal.querySelector("#edit-customer-id").value,
                            cedula: modal.querySelector("#edit-customer-cedula").value,
                            nombre: modal.querySelector("#edit-customer-nombre").value,
                            apellido: modal.querySelector("#edit-customer-apellido").value,
                            telefono: modal.querySelector("#edit-customer-telefono").value || null,
                            email: modal.querySelector("#edit-customer-email").value || null
                        };
                        // Aquí podrías llamar a un método para actualizar el cliente en la base de datos
                        apiClienteInstance.actualizarCliente(updatedCliente.id, updatedCliente)
                        .then(() => {
                            console.log("Cliente actualizado:", updatedCliente);
                            // Aquí podrías actualizar la vista del cliente
                            this._element.querySelector(".customer__card-name").textContent = `${updatedCliente.nombre} ${updatedCliente.apellido}`;
                            this._element.querySelector(".customer__card-cedula").textContent = updatedCliente.cedula;
                            // Cerrar el modal
                            modal.classList.remove("is-active");
                        })
                        .catch((error) => {
                            console.error("Error al actualizar el cliente:", error);
                        });
                    });
                })
                
            } catch (error) {
                console.error("Error al obtener el cliente:", error);
                
            } */
        });
        // Agregar el evento para el botón de eliminar
        this._element
        .querySelector("#customer__delete-button")
        .addEventListener("click", () => {
            console.log("Soy un boton de elminar");
        });
    }

    generateCustomer() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.id = this._clienteId;
        this._element.querySelector(".customer__card-name").textContent = `${this._nombre} ${this._apellido}`;
        this._element.querySelector(".customer__card-cedula").textContent = this._cedula;

        return this._element;
    }
    /* get clienteId() {
        return this._clienteId;
    } */

}
