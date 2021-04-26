const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_passive',
    activeButtonClass: 'popup__button_active',
    inputErrorClass: 'popup__item_error',
  }
  

class FormValidator {
    constructor(validationConfig, formElement){
    
    }


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


}


// Вызовем функцию
enableValidation(validationConfig);