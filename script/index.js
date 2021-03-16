//Находим Popup и его элементы в DOM
let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close')
let closePopupOverlay = document.querySelector('.popup')
//функция открытия popup
function openPopup() {
  popup.classList.add('popup_opened');
}
//фунция закрытия popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

//отслеживаем событие и запускаем зaкрытие и открытие popup
openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
closePopupOverlay.addEventListener('click', closePopup);

//находим форму и поля формы в DOM
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__item_type_name');
let jobInput = formElement.querySelector('.popup__item_type_profession');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();

   // Вставляем новые значения с помощью textContent
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  // закрываем окно формы после отправки
formElement.addEventListener('submit', closePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


