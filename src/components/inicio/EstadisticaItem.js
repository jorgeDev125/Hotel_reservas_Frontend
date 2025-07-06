

export default class EstadisticaItem {
  constructor(data) {
    this._nombre_estado = data.nombre_estado;
    this._cantidad = data.cantidad;
  }

  //función para clonar la plantilla
  _getTemplate() {
    const newCard = document
      .querySelector("#estadisticaItem-template")
      .content.querySelector(".estadistica__card")
      .cloneNode(true);
    return newCard;
  }


  generateCard() {
    this._element = this._getTemplate();
    this._element.id = this._reserva_id;
    if (this._nombre_estado === "En Limpieza") {
      this._element.querySelector(".estadistica__card-info").textContent = `${this._nombre_estado}`;
    } else {
      this._element.querySelector(".estadistica__card-info").textContent = `${this._nombre_estado}s`;
    }
    this._element.querySelector(".estadistica__card-number").textContent = this._cantidad;
    

    switch (this._nombre_estado) {
      case "Pendiente":
      case "Reservada":
        this._element.classList.add("border-gray-500");
        this._element
          .querySelector(".estadistica__card-number")
          .classList.add("bg-gray-500");
      
        break;
      case "Activa":
      case "Ocupada":
        this._element.classList.add("border-amber-600");
        this._element
          .querySelector(".estadistica__card-number")
          .classList.add("bg-amber-600");
      
        break;
      case "Completada":
      case "Disponible":
        this._element.classList.add("border-lime-600");
        this._element
          .querySelector(".estadistica__card-number")
          .classList.add("bg-lime-600");
       
        break;
      case "Cancelada":
      case "No Disponible":
        this._element.classList.add("border-red-700");
        this._element
          .querySelector(".estadistica__card-number")
          .classList.add("bg-red-700");
        break;
        case "En Limpieza":
        this._element.classList.add("border-blue-700");
        this._element
          .querySelector(".estadistica__card-number")
          .classList.add("bg-blue-700");
        break;
    }

    return this._element;
  }
}
