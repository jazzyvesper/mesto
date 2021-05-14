import {Card} from './Сard.js';
import {initialCards} from './Initial-Card.js';
import {FormValidator} from './FormValidator.js';
import {validationConfig} from './FormValidator.js';
import {popupEdit, openPopupBtn, closePopupBtn, popupAddCard,popupImage, closePopupImageBtn, openPopupAddCardBtn, closePopupAddCardBtn,
  imageElement, imageCaption, nameInput, jobInput, profileNameElement, profileJobElement, addformElement, placeInput,
  photoInput, photoGrid} from './constants.js' ;
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import {Section} from './Section.js';




/*//Добавление карточек на страницу
const AddCardSubmitHandler = new Section({data: popupCardValue, renderer: (item) => {
  const card = new Card(item, '#photo-card', ()=> {PopupCardImage.open(item.link, item.name)});
  
  const photoElement = card.generateCard();
  formAddCardSubmitHandler.addItem(photoElement);
}},'.photo-grid');*/

const PopupFormAddCard = new PopupWithForm({formSelector: popupAddCard, submitHandler: (formValues) => {
  const cardAdd = new Section({data: [formValues], renderer: (item) => {
    const card = new Card(item, '#photo-card', ()=> {PopupCardImage.open(item.link, item.name)});
    const photoElement = card.generateCard();
    cardAdd.addItem(photoElement);
  }},'.photo-grid');
  cardAdd.renderCard();}
  
})

//Добавляет данные редактирования профиля
const  PopupFormEdit =  new PopupWithForm({formSelector: popupEdit, 
  submitHandler: (formValues)=>{
    UserInfoProfile.setUserInfo(formValues.name, formValues.job)
  }});

const UserInfoProfile = new UserInfo({nameSelector: '.profile__title',jobSelector: '.profile__subtitle'});
const PopupCardImage = new PopupWithImage(popupImage);
new FormValidator(validationConfig, popupEdit).enableValidation();
new FormValidator(validationConfig, popupAddCard).enableValidation();

PopupCardImage.setEventListeners();
PopupFormEdit.setEventListeners();
PopupFormAddCard.setEventListeners();

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
  PopupFormEdit.open();
  UserInfoProfile.getUserInfo()
  removeInputError(popupEdit); 
  new FormValidator(validationConfig, popupEdit).enableValidation();
});

//отслеживаем клик по добавлению карточек и открываем модальное окно
openPopupAddCardBtn.addEventListener('click', () => {
  PopupFormAddCard.open();
  //removeCardData();
  removeInputError(popupAddCard);
  new FormValidator(validationConfig, popupAddCard).enableValidation();
});

//Создаем начальные карточки на странице
const cardList = new Section({data: initialCards, renderer: (item) => {
  const card = new Card(item, '#photo-card', ()=> {PopupCardImage.open(item.link, item.name)});
  const photoElement = card.generateCard();
  cardList.addItem(photoElement);
}},'.photo-grid');
cardList.renderCard();


//Изменение данных в профиле
function formEditProfleSubmitHandler (data) {
  UserInfoProfile.setUserInfo()
}

/*new PopupWithForm (popupEdit,
  formEditProfleSubmitHandler = (formData)=> {
    const UserInfolist = new UserInfo({name: formData.name, job: formData.name})
    UserInfolist.setUserInfo();
  })*/

/*//Функция очистки полей добавления карточек
function removeCardData() {
  photoInput.value = "";
  placeInput.value = "";
}*/
//Реализованое добавление новых карточек на страницу
/*function formAddCardSubmitHandler (data) {
  //отмена стандартной отправки формы
  //evt.preventDefault();
  // создаем псевдомассив из вводимых данных
  const popupCardValue = {
   name: placeInput.value,
   link: photoInput.value
  };
  const card = new Card(popupCardValue,'#photo-card', ()=> {
    PopupCardImage.open(item.link, item.name)
  });
  photoGrid.prepend(card.generateCard(popupCardValue));
};*/

//функции открытия модального окна
/*function openPopup(modal) {
  modal.classList.add('popup_opened');
  //добавление слушателя при нажатии на клавиатуру  
  document.addEventListener ('keydown', keyHandler);
  document.addEventListener ('click', overlayHandler);
}*/
/*// функция закрытия модального окна
function closePopup(modal) {
  modal.classList.remove('popup_opened');
//отслеживаем событие клика и запускаем фунцкцию обработчик
  document.removeEventListener ('keydown', keyHandler);
  document.removeEventListener ('click', overlayHandler);
}*/


/*//функция закрытия модального окна при нажатии на Escape
function keyHandler (evt){
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}*/

//закрытие модального окна при клике на оверлэй
/*function overlayHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}*/

//Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
//popupEdit.addEventListener('submit', formEditProfleSubmitHandler);




//отслеживаем клик по крестику и закрываем модальное окно изображения 
//closePopupImageBtn.addEventListener('click', () => new PopupWithImage(popupImage));


//отслеживаем клик по крестику и закрываем модальное окно
/*closePopupBtn.addEventListener('click', () => new Popup(popupEdit).close());*/
//отслеживаем клик по крестику и закрываем модальное окно добавления карточек
//closePopupAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));

//функция открытия изображения в модальном окне
/*export default function handleOpenImage (alt, link) {
  imageElement.src = link;
  imageCaption.textContent = alt;
  openPopup(popupImage);
}*/

//Прикрепляем обработчик к форме добавления карточек
//popupAddCard.addEventListener('submit', formAddCardSubmitHandler);
//начальные Карточки на странице
/*initialCards.forEach(item => {
  const card = new Card(item,'#photo-card', ()=> {
    PopupCardImage.open(item.link, item.name)
  });
  const photoElement = card.generateCard();
  document.querySelector('.photo-grid').prepend(photoElement);
});*/
//Функция заполнения полей данными из профиля
/*function addProfileData() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
}*/
