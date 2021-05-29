import {Popup} from './Popup.js';
export class PopupWithForm extends Popup {
  constructor({popupSelector, submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__item');
    this._buttonEditSave = this._popupForm.querySelector('.popup__button');
  }

  _getInputValues() {  
    // создаём пустой объект
    this._formValues = {};
  
    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
      
    return this._formValues;
    }

 //Пункт 10. Улучшенный UX всех форм
 renderLoading(isLoading) {
    if(isLoading) {
      this._buttonEditSave.textContent = 'Сохранение...'; 
    }else {
       this._buttonEditSave.textContent = this._buttonEditSave.ariaLabel;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}