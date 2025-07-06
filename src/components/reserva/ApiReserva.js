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
    
    //obtner reservadas agrupadas por estado
    async actualizarEstadoReservacion() {
    return await this._makeRequest(`/reservas/estados`);
    }   
    

}
