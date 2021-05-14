import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(formSelector) {
   super(formSelector);
  }

  open(link, alt) {
    super.open()
    this._formSelector.querySelector('.popup__image').src = link;
    this._formSelector.querySelector('.popup__caption').textContent = alt; 
  }
}