//Находим Popup и его элементы в DOM
let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__editButton');
let closePopupBtn = document.querySelector('.popup__close')
let closePopupOverlay = document.querySelector('.popup__overlay')
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
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__firstname');
let jobInput = formElement.querySelector('.popup__profession');

function formSubmitHandler (evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();
    
  // Получаем значение полей jobInput и nameInput из свойства value
  nameInput.getAttribute('value');
  jobInput.getAttribute('value');

  // Выбераем элементы, куда должны быть вставлены значения полей
  let name = document.querySelector('.profile__title');
  let job = document.querySelector('.profile__subtitle');

   // Вставляем новые значения с помощью textContent
  name.textContent = nameInput.value
  job.textContent = jobInput.value
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// закрываем окно формы после отправки
formElement.addEventListener('submit', closePopup);

