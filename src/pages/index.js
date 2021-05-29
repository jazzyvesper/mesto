import '../pages/index.css'
import {Card} from '../components/Сard.js';
import {initialCards} from '../utils/Initial-Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {validationConfig} from '../components/FormValidator.js';
import {popupEdit, openPopupBtn, popupAddCard,popupImage, openPopupChangeAvatarBtn, profileAvatar, popupChangeAvatar, openPopupAddCardBtn,jobInput, nameInput, profileNameElement, profileJobElement} from '../utils/constants.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Section} from '../components/Section.js';
import {Api} from '../components/Api.js';
import {PopupCardDelete} from '../components/PopupCardDelete.js';

export const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-24',
  token: '35787694-4746-4a15-83d0-360cc3763119',
}); 

const userInfoProfile = new UserInfo({nameSelector: profileNameElement, jobSelector: profileJobElement, avatarSelector: profileAvatar});
const popupCardImage = new PopupWithImage(popupImage);
new FormValidator(validationConfig, popupEdit).enableValidation();
new FormValidator(validationConfig, popupAddCard).enableValidation();
new FormValidator(validationConfig, popupChangeAvatar).enableValidation();
popupCardImage.setEventListeners();

//Пункт 6. Попап удаления карточки
const popupDeleteCard = new PopupCardDelete('.popup_type_delete-card');
popupDeleteCard.setEventListeners();
//
const cardItem = new Section({data: initialCards, renderer: (item) => {
  cardItem.addItem(createCard(item));
}},'.photo-grid');

//Пункт 1 и 2. Загрузка карточек и данных профиля с сервера
Promise.all([api.getinfo(), api.getCards()])
  .then(([userData, cardlist]) => {
      userInfoProfile.setUserAvatar(userData);
      userInfoProfile.setUserInfo(userData);
      cardItem.renderCard(cardlist);
  })
  .catch(err => console.log(`Ошибка при загрузке профиля: ${err}`))


//Пункт 4. Добавление новой карточки
const popupFormAddCard = new PopupWithForm({popupSelector: popupAddCard, submitHandler: (formValues) => {
  popupFormAddCard.renderLoading(true);
  api.createNewCard(formValues)
  .then((res)=> {
    cardItem.addItem(createCard(res));
    popupFormAddCard.close();
  })
  .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
  .finally(() => {
    popupFormAddCard.renderLoading(false);
  })
}
})

//Пункт 3. Редактирование профиля
const  popupFormEdit =  new PopupWithForm({popupSelector: popupEdit, 
  submitHandler: (formValues)=>{
    popupFormEdit.renderLoading(true);
    api.changeInfo(formValues)
    .then((res)=> {
      userInfoProfile.setUserInfo(res, res)
      popupFormEdit.close();
    })
    .catch(err => console.log(`Ошибка при сохранении информации: ${err}`))
    .finally(() => {
      popupFormEdit.renderLoading(false);
    })
}});

// Генерация карточки 
function createCard (item) {
  const card = new Card(item, '#photo-card', ()=> {popupCardImage.open(item.link, item.name)}, ()=> {
    popupDeleteCard.open(()=> {
      api.deleteCard(card.getId())
      .then(() => {
        card.handleRemoveCard();
        popupDeleteCard.close();
      })
      .catch(e => console.log('Ошибка при удалении карточки'))
    })
  }, api, userInfoProfile.getUserId())
  const photoElement = card.generateCard();
  return photoElement;
}

//Пункт 9. Обновление аватара пользователя
const popupFormEditAvatar = new PopupWithForm({popupSelector:popupChangeAvatar, submitHandler: (formValues)=> {
  popupFormEditAvatar.renderLoading(true);
  api.changeAvatar(formValues)
  .then((res)=> {
    userInfoProfile.setUserAvatar(res);
    popupFormEditAvatar.close();
  })
  .catch(err => console.log(`Ошибка при обновлении фотографии: ${err}`))
  .finally(() => {
    popupFormEditAvatar.renderLoading(false);
  })
 }
});

popupFormEdit.setEventListeners();
popupFormAddCard.setEventListeners();
popupFormEditAvatar.setEventListeners()

//функция подтягивает данные профиля в модалку редактирования профиля
function inheritProfileText (data) {
  nameInput.value  = data.name
  jobInput.value  = data.job
}

//отслеживаем клик по редактированию профиля и открываем модальное окно
openPopupBtn.addEventListener('click', () => {
  popupFormEdit.open();
  inheritProfileText(userInfoProfile.getUserInfo());
});

//отслеживаем клик по добавлению карточек и открываем модальное окно
openPopupAddCardBtn.addEventListener('click', () => {
  popupFormAddCard.open();
});

//отслеживаем клик по аватару
openPopupChangeAvatarBtn.addEventListener('click', ()=> {
  popupFormEditAvatar.open();
})