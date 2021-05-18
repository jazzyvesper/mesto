export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_passive',
  activeButtonClass: 'popup__button_active',
  inputErrorClass: 'popup__item_error',
  }

export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = document.querySelector(formElement);
    this._inputList = this._validationConfig.inputSelector;
    this._submitButton = this._validationConfig.submitButtonSelector;
    this._form = this._validationConfig.formSelector;
    this._inactiveButton = this._validationConfig.inactiveButtonClass;
    this._activeButton = this._validationConfig.activeButtonClass;
    this.inputError = this._validationConfig.inputErrorClass
  }

  //приватный метод проверяет правильно ли заполнены поля
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  // приватный метод слушателя на вводимые дданые
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputList));
    const buttonElement = this._formElement.querySelector(this._submitButton);
    // Вызовем toggleButtonState, для начальной блокировки кнопки
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState(inputList, buttonElement);
      });
      this._formElement.addEventListener('reset', () => {    
        this._hideInputError(inputElement)
      });
    });

  };

  
  //приватный метод блокировки кнопки в зависимости от правилно заполненного поля
  _toggleButtonState (inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(this._inactiveButton);
    buttonElement.classList.remove(this._activeButton);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(this._inactiveButton);
      buttonElement.classList.add(this._activeButton);
    }      
  }

  //приватный  метод показа сообщений об ошибке валидации
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(this.inputError);
    // Показываем сообщение об ошибке
    errorElement.textContent = errorMessage;
  };
  
  //приватный  метод скрывает элемент ошибки
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this.inputError);
    // Скрываем сообщение об ошибке
    errorElement.textContent = '';
  };
  
  //проверяет валидность поля, внутри вызывает showInputError или hideInputError.
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement,inputElement.validationMessage );
    } else {
      this._hideInputError(inputElement);
    }
  };


  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
       evt.preventDefault();
     });
     // Для каждой формы вызовем функцию setEventListeners,передав ей элемент формы
     this._setEventListeners()
   
 };

}