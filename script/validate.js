const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_passive',
  activeButtonClass: 'popup__button_active',
  inputErrorClass: 'popup__item_error',
}

//показывает элемент ошибки
const showInputError = ((formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);

  // Показываем сообщение об ошибке
  errorElement.textContent = errorMessage;
});

//скрывает элемент ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(validationConfig.inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.textContent = '';
};

//проверяет валидность поля, внутри вызывает showInputError или hideInputError.
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, выодим ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скрываем
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы, создаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  // Вызовем toggleButtonState, для начальной блокировки кнопки
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы массива и поставим слушатель на вводимые значения
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (obj) => {
  // Найходим все формы в DOM, и создаем из них массив
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  // Обойдём все элементы массива и у каждой формы отменим стандартное поведение
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation(validationConfig);

//функция проверяет правильно ли заполнены поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//функция блокировки кнопки в зависимости от правилно заполненного поля
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.classList.remove(validationConfig.activeButtonClass);
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.classList.add(validationConfig.activeButtonClass);
    }
}