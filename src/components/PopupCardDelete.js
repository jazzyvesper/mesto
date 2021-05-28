import {Popup} from './Popup.js';
export class PopupCardDelete extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector)
    this._popupform = this._popup.querySelector('.popup__form');
    
  }
   
//функции открытия модального окна
  open(deleteCard) {
    super.open();
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupform.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._deleteCard();
    });
  }
}