import '../pages/index.css'
import {Card} from '../components/Сard.js';
import {initialCards} from '../utils/Initial-Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {validationConfig} from '../components/FormValidator.js';
import {popupEdit, openPopupBtn, popupAddCard,popupImage, openPopupAddCardBtn, nameInput, jobInput, profileNameElement, profileJobElement} from '../utils/constants.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Section} from '../components/Section.js';

const userInfoProfile = new UserInfo({nameSelector: profileNameElement, jobSelector: profileJobElement});
const popupCardImage = new PopupWithImage(popupImage);
new FormValidator(validationConfig, popupEdit).enableValidation();
new FormValidator(validationConfig, popupAddCard).enableValidation();
popupCardImage.setEventListeners();

//Создание карточки
function createCard (item) {
  const card = new Card(item, '#photo-card', ()=> {popupCardImage.open(item.link, item.name)});
  const photoElement = card.generateCard();
  return photoElement;
}

//Создаем начальные карточки на странице
const cardList = new Section({data: initialCards, renderer: (item) => {
  cardList.addItem(createCard(item));
}},'.photo-grid');
cardList.renderCard();

//Добавляет карточки при заполнении полей
const popupFormAddCard = new PopupWithForm({popupSelector: popupAddCard, submitHandler: (formValues) => {
  const photoCardNew = createCard(formValues);
   cardList.addItem(photoCardNew);
 }
})
popupFormAddCard.setEventListeners();
//Добавляет данные редактирования профиля
const  popupFormEdit =  new PopupWithForm({popupSelector: popupEdit, 
  submitHandler: (formValues)=>{
    userInfoProfile.setUserInfo(formValues['first-name'], formValues.profession)
  }
});
popupFormEdit.setEventListeners();

//функция подтягивает данные профиля в модалку редактирования профиля
function inheritProfileText (data) {
  nameInput.value  = data.name
  jobInput.value  = data.job
};

//отслеживаем клик по редактированию профиля и открываем модальное окно
openPopupBtn.addEventListener('click', () => {
  popupFormEdit.open();
  inheritProfileText(userInfoProfile.getUserInfo());
});

//отслеживаем клик по добавлению карточек и открываем модальное окно
openPopupAddCardBtn.addEventListener('click', () => {
  popupFormAddCard.open();
});
