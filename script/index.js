//Находим Popup и его элементы в DOM
let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__close')
let closePopupOverlay = document.querySelector('.popup')

//Реализовано наличия карточек на сайте
const initialCards = [
  {
    name: 'Сентинский храм',
    link: './images/sentinskii_hram.png'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/Elbrus.png'
  },
  {
    name: 'Домбай',
    link: './images/Dombay.png'
  },
  {
    name: 'Обсерватория РАН',
    link: './images/Обсерватория.png'
  },
  {
    name: 'Теберда',
    link: './images/teberda.jpg'
  },
  {
    name: 'Перевал Гумбаши',
    link: './images/gumbashi.jpg'
  }
];
initialCards.forEach(function (item) {
  const photoCard = document.querySelector('#photo-card').content;
  const photoGrid = document.querySelector('.photo-grid');
// клонируем содержимое тега template
  const photoElement = photoCard.querySelector('.photo-card').cloneNode(true);
// наполняем содержимым
  photoElement.querySelector('.photo-card__image').src = item.link;
  photoElement.querySelector('.photo-card__title').textContent = item.name;
// отображаем на странице
  photoGrid.append(photoElement);
});

//открытия и закрытия popup добавления карточек
const PopupAddCard = document.querySelector('.popup_AddCard');
const openPopupAddCard = document.querySelector('.profile__add-button');
const closePopupAddCardBtn = PopupAddCard.querySelector('.popup__close');
openPopupAddCard.addEventListener('click', openPopupAdd);
closePopupAddCardBtn.addEventListener('click', closePopupAdd);
function openPopupAdd() {
  PopupAddCard.classList.add('popup_opened'); 
}
function closePopupAdd() {
  PopupAddCard.classList.remove('popup_opened');
}



//функция открытия popup
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;

}
//фунция закрытия popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

//отслеживаем событие и запускаем зaкрытие и открытие popup
openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

//находим форму и поля формы в DOM
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__item_type_name');
let jobInput = formElement.querySelector('.popup__item_type_profession');
let profileNameElement = document.querySelector('.profile__title');
let profileJobElement = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();
   // Вставляем новые значения с помощью textContent
   profileNameElement.textContent = nameInput.value;
   profileJobElement.textContent = jobInput.value;
  // закрываем окно формы после отправки
   closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


