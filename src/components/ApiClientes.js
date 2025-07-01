import { Api } from "./Api";

export class ApiCliente extends Api {
    constructor({ baseUrl, headers }) {
        super({ baseUrl, headers });
    }

    // Método para obtener todos los clientes
    obtenerClientes() {
        return this._makeRequest("/clientes");
    }

    // Método para obtener un cliente por ID
    obtenerClientePorId(clienteId) {
        return this._makeRequest(`/clientes/${clienteId}`);
    }

    // Método para crear un nuevo cliente
    crearCliente(clienteData) {
        return this._makeRequest("/clientes", "POST", clienteData);
    }

    // Método para actualizar un cliente
    actualizarCliente(clienteId, clienteData) {
        return this._makeRequest(`/clientes/${clienteId}`, "PUT", clienteData);
    }

    // Método para eliminar un cliente
    eliminarCliente(clienteId) {
        return this._makeRequest(`/clientes/${clienteId}`, "DELETE");
    }
}