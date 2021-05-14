import {Card} from './Сard.js';
import {initialCards} from './Initial-Card.js';
import {FormValidator} from './FormValidator.js';
import {validationConfig} from './FormValidator.js';
import {popupEdit, openPopupBtn, popupAddCard,popupImage, openPopupAddCardBtn, profileNameElement, profileJobElement} from './constants.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import {Section} from './Section.js';

//Добавляет данные редактирования профиля
const  PopupFormEdit =  new PopupWithForm({formSelector: popupEdit, 
  submitHandler: (formValues)=>{
    UserInfoProfile.setUserInfo(formValues['first-name'], formValues.profession)
  }});

//Добавляет карточки при заполнении полей
const PopupFormAddCard = new PopupWithForm({formSelector: popupAddCard, submitHandler: (formValues) => {
    const cardAdd = new Section({data: [formValues], renderer: (item) => {
      const card = new Card(item, '#photo-card', ()=> {PopupCardImage.open(item.link, item.name)});
      const photoElement = card.generateCard();
      cardAdd.addItem(photoElement);
    }},'.photo-grid');
    cardAdd.renderCard();}
})  

const UserInfoProfile = new UserInfo({nameSelector: profileNameElement, jobSelector: profileJobElement});
const PopupCardImage = new PopupWithImage(popupImage);
new FormValidator(validationConfig, popupEdit).enableValidation();
new FormValidator(validationConfig, popupAddCard).enableValidation();

PopupCardImage.setEventListeners();
PopupFormEdit.setEventListeners();
PopupFormAddCard.setEventListeners();

//Создаем начальные карточки на странице
const cardList = new Section({data: initialCards, renderer: (item) => {
  const card = new Card(item, '#photo-card', ()=> {PopupCardImage.open(item.link, item.name)});
  const photoElement = card.generateCard();
  cardList.addItem(photoElement);
}},'.photo-grid');
cardList.renderCard();

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
  removeInputError(popupAddCard);
  new FormValidator(validationConfig, popupAddCard).enableValidation();
});