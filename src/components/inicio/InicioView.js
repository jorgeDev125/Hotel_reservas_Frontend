

export default class InicioView {
  constructor() {}

  //función para clonar la plantilla
  _getTemplate() {
    const newView = document
      .querySelector("#inicioViewTemplate")
      .content.querySelector(".inicio__view")
      .cloneNode(true);
    return newView;
  }



  generateView() {
    this._element = this._getTemplate();

    return this._element;
  }
}
