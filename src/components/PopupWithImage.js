import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
   super(popupSelector);
   this._popupImage = this._popupSelector.querySelector('.popup__image'),
   this._popupCaption = this._popupSelector.querySelector('.popup__caption')
  }

  open(link, alt) {
    super.open()
    this._popupImage.src = link;
    this._popupCaption.textContent = alt; 
  }
}