import { Api } from "../Api";

export class ApiReserva extends Api {
  constructor({ baseUrl, headers }) {
    super({ baseUrl, headers });
  }

    //mostrar habitaciones
    async obtenerReservaciones() {
    return await this._makeRequest("/reservas");
  }

    //mostrar una reserva
    async obtenerReservacionPorId(id) {
    return await this._makeRequest(`/reservas/${id}`);
        
    }

    //crear una reserva
    async crearReservacion(reservacion) {
    return await this._makeRequest("/reservas", "POST", reservacion);
    }   

    // buscar reservaciones por Id
    async buscarReservacionesPorId(id) {
        return await this._makeRequest(`/reservas/${id}`);
    }


    //actualizar estado de reserva
    async actualizarEstadoReservacion(id, estadoId) {
    return await this._makeRequest(`/reservas/${id}/estado`, "PUT", estadoId);
    }   

    // actualizar una habitación
    // async actualizarHabitacion(id, habitacion) {
    // return await this._makeRequest(`/habitaciones/${id}`, "PUT", habitacion);
    // }   

    //eliminar una habitación
    // async eliminarHabitacion(id) {  
    // return await this._makeRequest(`/habitaciones/${id}`, "DELETE");
    // }   

    
    //buscar reservaciones por estado
    // async buscarReservacionesPorEstado(estado) {
    //     return await this._makeRequest(`/reservas/estado/${estado}`);
    // }

}
