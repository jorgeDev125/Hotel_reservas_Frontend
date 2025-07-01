/* import { apiClienteInstance } from "../utils/clientes"; */

import PopupCliente from "./PopupCliente";

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
            const popupCliente = new PopupCliente()
            const popup = popupCliente.generatePopup();
            popupCliente.open();
            document.querySelector(".popupCliente").prepend(popup);
        });
       
    }

    generateView() {
        this._element = this._getTemplate();
        this._setEventListeners();

        return this._element;
    }
   

}
