/* import { apiClienteInstance } from "../utils/clientes"; */

export default class ClienteView {
    constructor() {      
    }

    //función para clonar la plantilla
    _getTemplate() {
        const newView = document
        .querySelector("#clientesViewTemplate")
        .content.querySelector(".clientes__view")
        .cloneNode(true);
        return newView;
    }

    _setEventListeners() {
        // Agregar el evento para el botón de agregar cliente
        this._element
        .querySelector("#addClienteButton")
        .addEventListener("click", () => {
            console.log("Soy un boton de agregar usuario");
        });
       
    }

    generateView() {
        this._element = this._getTemplate();
        this._setEventListeners();

        return this._element;
    }
   

}
