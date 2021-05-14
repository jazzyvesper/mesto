import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({formSelector, submitHandler}) {
    super(formSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._formSelector.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__item');
    
  }

  _getInputValues() {  
  // создаём пустой объект
  this._formValues = {};

  // добавляем в этот объект значения всех полей
  this._inputList.forEach(input => this._formValues[input.name] = input.value);

  // возвращаем объект значений
  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._popupForm.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this.close();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
    
  }

}

