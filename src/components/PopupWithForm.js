import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor({popupSelector, submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__item');
    
  }

  _getInputValues() {  
  // создаём пустой объект
  this._formValues = {};

  // добавляем в этот объект значения всех полей
  this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}