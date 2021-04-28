import {Card} from './Сard.js';
import {initialCards} from './Initial-Card.js';
import {FormValidator} from './FormValidator.js';
import {validationConfig} from './FormValidator.js';

//Находим Popup и его элементы в DOM
const popupEdit = document.querySelector('.popup_type_edit');
const openPopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = popupEdit.querySelector('.popup__close');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const closePopupImageBtn = popupImage.querySelector('.popup__close');
const openPopupAddCardBtn = document.querySelector('.profile__add-button');
const closePopupAddCardBtn = popupAddCard.querySelector('.popup__close');

// Находим изображение и подпись 
const imageElement = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');

//находим форму и поля формы в DOM
const nameInput = popupEdit.querySelector('.popup__item_type_name');
const jobInput = popupEdit.querySelector('.popup__item_type_profession');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

//Добавление карточек на страницу
const addformElement = popupAddCard.querySelector('.popup__form');
const placeInput = addformElement.querySelector('.popup__item_type_place');
const photoInput = addformElement.querySelector('.popup__item_type_link');
const photoGrid = document.querySelector('.photo-grid');

//функции открытия модального окна
function openPopup(modal) {
  modal.classList.add('popup_opened');
  //добавление слушателя при нажатии на клавиатуру  
  document.addEventListener ('keydown', keyHandler);
  document.addEventListener ('click', overlayHandler);
}

//Функция заполнения полей данными из профиля
function addProfileData() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}

//Функция очистки полей добавления карточек
function removeCardData() {
  photoInput.value = "";
  placeInput.value = "";
}

// функция закрытия модального окна
function closePopup(modal) {
  modal.classList.remove('popup_opened');

  //отслеживаем событие клика и запускаем фунцкцию обработчик
  document.removeEventListener ('keydown', keyHandler);
  document.removeEventListener ('click', overlayHandler);
}


//функция закрытия модального окна при нажатии на Escape
function keyHandler (evt){
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//закрытие модального окна при клике на оверлэй
function overlayHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция удаления ошибок
function removeInputError(formElement) {
  const inputListform = formElement.querySelectorAll('.popup__item');
  inputListform.forEach((item)=> {
    const errorElement = formElement.querySelector(`.${item.id}-error`);
    errorElement.textContent = '';
  })
}

//отслеживаем клик по редактированию профиля и открываем модальное окно
openPopupBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  addProfileData();
  removeInputError(popupEdit); 
});

//отслеживаем клик по крестику и закрываем модальное окно
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));

//отслеживаем клик по добавлению карточек и открываем модальное окно
openPopupAddCardBtn.addEventListener('click', () => {
  openPopup(popupAddCard);
  removeCardData();
  removeInputError(popupAddCard);
});

//отслеживаем клик по крестику и закрываем модальное окно добавления карточек
closePopupAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));

//отслеживаем клик по крестику и закрываем модальное окно изображения 
closePopupImageBtn.addEventListener('click', () => closePopup(popupImage));

//Изменение данных в профиле
function formEditProfleSubmitHandler (evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();
   
  // Вставляем новые значения с помощью textContent
  profileNameElement.textContent = nameInput.value;
  profileJobElement.textContent = jobInput.value;
  // закрываем окно формы после отправки
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEdit.addEventListener('submit', formEditProfleSubmitHandler);

//Реализованое добавление новых карточек на страницу
function formAddCardSubmitHandler (evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();
  // создаем псевдомассив из вводимых данных
  const popupCardValue = {
   name: placeInput.value,
   link: photoInput.value
  };
  const card = new Card(popupCardValue,'#photo-card');
  photoGrid.prepend(card.generateCard(popupCardValue));
  // отображаем на странице
  closePopup(popupAddCard);
};
//Прикрепляем обработчик к форме добавления карточек
popupAddCard.addEventListener('submit', formAddCardSubmitHandler);

//начальные Карточки на странице
initialCards.forEach(item => {
  const card = new Card(item,'#photo-card');
  const photoElement = card.generateCard();
  document.querySelector('.photo-grid').prepend(photoElement);
});


//функция открытия изображения в модальном окне
export default function handleOpenImage (alt, link) {
  imageElement.src = link;
  imageCaption.textContent = alt;
  openPopup(popupImage);
}
// Создаем экземпляр класса FormValidator для каждой проверяемой формы
new FormValidator(validationConfig, popupEdit).enableValidation();
new FormValidator(validationConfig, popupAddCard).enableValidation();

