export class Section {
  constructor({data, renderer}, containerSelector) {
    this._renderItem = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCard() {
    this._renderItem.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);   
  }
}