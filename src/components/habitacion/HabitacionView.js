

export default class HabitacionView {
  constructor() {}

  //función para clonar la plantilla
  _getTemplate() {
    const newView = document
      .querySelector("#roomViewTemplate")
      .content.querySelector(".room__view")
      .cloneNode(true);
    return newView;
  }



  generateView() {
    this._element = this._getTemplate();

    return this._element;
  }
}
