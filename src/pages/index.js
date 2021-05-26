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

const userInfoProfile = new UserInfo({nameSelector: profileNameElement, jobSelector: profileJobElement});
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

//Пункт 2. Загрузка карточек с сервера
api.getCards()
  .then((res)=> {
    if(res.ok) {
      return res.json()
    }else {
      return Promise.reject(res.status)
    } 
  })
  .then((res)=> {
    cardItem.renderCard(res);
  })
  .catch(err => console.log(`Ошибка при загрузке карточек: ${err}`))

//Пункт 4. Добавление новой карточки
const popupFormAddCard = new PopupWithForm({popupSelector: popupAddCard, submitHandler: (formValues) => {
  api.createNewCard(formValues)
    .then((res)=> {
      if(res.ok) {
      return res.json()
    }else {
      return Promise.reject(res.status)
    } 
    })
    .then((res)=> {
      cardItem.addItem(createCard(res));
    })
      .catch(err => console.log(`Ошибка при добавлении карточки: ${err}`))
  }
})

//Пункт 3. Редактирование профиля
const  popupFormEdit =  new PopupWithForm({popupSelector: popupEdit, 
  submitHandler: (formValues)=>{
    api.changeInfo(formValues)
    .then((res)=> {
    if(res.ok) {
     return res.json()
    }else {
    return Promise.reject(res.status)
    } 
    })
    .then((res)=> {
      userInfoProfile.setUserInfo(res.name, res.about)
    })
    .catch(err => console.log(`Ошибка при сохранении информации: ${err}`))
  }
});

//Пункт 1. Загрузка информации о пользователе с сервера
api.getinfo()
  .then((res)=> {
    if(res.ok) {
      return res.json()
    }else {
      return Promise.reject(res.status)
    } 
  })
  .then((res)=> {
    document.querySelector(profileNameElement).textContent = res.name
    document.querySelector(profileJobElement).textContent = res.about
    document.querySelector(profileAvatar).src = res.avatar
  })
  .catch(err => console.log(`Ошибка при загрузки данных профиля: ${err}`))

// Генерация карточки 
function createCard (item) {
  const card = new Card(item, '#photo-card', ()=> {popupCardImage.open(item.link, item.name)}, ()=> {
    popupDeleteCard.open(()=> {
      card.handleRemoveCard();
      card.handleCardDelete()
    })
  })
  const photoElement = card.generateCard();
  return photoElement;
}

//Пункт 9. Обновление аватара пользователя
const popupFormEditAvatar = new PopupWithForm({popupSelector:popupChangeAvatar, submitHandler: (formValues)=> {
  api.changeAvatar(formValues)
    .then((res)=> {
      if(res.ok) {
        return res.json()
      }else {
        return Promise.reject(res.status)
      } 
    })
    .then((res)=> {
      document.querySelector(profileAvatar).src = res.avatar
    })
    .catch(err => console.log(`Ошибка при обновлении фотографии: ${err}`))
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