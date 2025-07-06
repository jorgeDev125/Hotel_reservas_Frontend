import { Api } from "../Api";

export class ApiHabitacion extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

  //mostrar habitaciones
  async obtenerHabitaciones() {
    return await this._makeRequest("/habitaciones");
  }

    //mostrar una habitación
    async obtenerHabitacion(id) {
    return await this._makeRequest(`/habitaciones/${id}`);
        
    }

    //crear una habitación
    // async crearHabitacion(habitacion) {
    // return await this._makeRequest("/habitaciones", "POST", habitacion);
    // }   

    // actualizar una habitación
    // async actualizarHabitacion(id, habitacion) {
    // return await this._makeRequest(`/habitaciones/${id}`, "PUT", habitacion);
    // }   

    //eliminar una habitación
    // async eliminarHabitacion(id) {  
    // return await this._makeRequest(`/habitaciones/${id}`, "DELETE");
    // }   

    //cambiar estado de una habitación
    async cambiarEstadoHabitacion(habitacionId, estadoId) {
        return await this._makeRequest(`/habitaciones/${habitacionId}/estado`, "PUT", { estadoId });
    }
    //buscar habitaciones por estado
    async buscarHabitacionesPorEstado(estadoId) {
        return await this._makeRequest(`/habitaciones/estado/${estadoId}`);
    }
    //buscar habitaciones por estado
    async agruparHabitacionesPorEstado() {
        return await this._makeRequest(`/habitaciones/estados`);
    }

}
