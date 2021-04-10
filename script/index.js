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
const formElement = document.querySelector('.popup_type_edit');
const nameInput = formElement.querySelector('.popup__item_type_name');
const jobInput = formElement.querySelector('.popup__item_type_profession');
const profileNameElement = document.querySelector('.profile__title');
const profileJobElement = document.querySelector('.profile__subtitle');

//Добавление карточек на страницу
const addformElement = popupAddCard.querySelector('.popup__form')
const placeInput = addformElement.querySelector('.popup__item_type_place');
const photoInput = addformElement.querySelector('.popup__item_type_link');
const photoCard = document.querySelector('#photo-card').content;
const photoGrid = document.querySelector('.photo-grid');

//Данные для карточек
const initialCards = [
  {
    name: 'Сентинский храм',
    link: './images/sentinskii-hram.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/Elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jpg'
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

//функция открытия и закрытия popup
function openPopup(modal) {
  modal.classList.add('popup_opened');
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

//отслеживаем событие и запускаем зaкрытие и открытие popup
openPopupBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  //заполняем поля формы
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});
closePopupBtn.addEventListener('click', () => closePopup(popupEdit));

openPopupAddCardBtn.addEventListener('click', () => openPopup(popupAddCard));
closePopupAddCardBtn.addEventListener('click', () => closePopup(popupAddCard));

//закрытие изображения 
closePopupImageBtn.addEventListener('click', () => closePopup(popupImage));

//Изменение данных в профиле
function formSubmitHandler (evt) {
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
formElement.addEventListener('submit', formSubmitHandler);

// Генерация карточек
function insertCard (obj){
  // клонируем содержимое тега template
  const photoElement = photoCard.querySelector('.photo-card').cloneNode(true);

  //находим иконки корзины, лайкаи и изображения
  const cardDelete = photoElement.querySelector('.photo-card__icon_type_basket');
  const cardLike = photoElement.querySelector('.photo-card__icon_type_like');
  const imageModalWindow = photoElement.querySelector('.photo-card__image')
  
  // наполняем содержимым
  photoElement.querySelector('.photo-card__image').src = obj.link;
  photoElement.querySelector('.photo-card__image').alt = obj.name;
  photoElement.querySelector('.photo-card__title').textContent = obj.name;
  
  //удаление карточки при клике на корзину
  cardDelete.addEventListener('click', evt => {
    const button = evt.target;
    button.closest('.photo-card').remove();
  })

  //лайки на карточках
  cardLike.addEventListener('click', evt => {
    const button = evt.target;
    button.classList.toggle('photo-card__icon_type_like-active');
  })

  //Открытие изображения по клику
  imageModalWindow.addEventListener('click', evt => {
    const img = evt.target
    imageElement.src = img.src
    imageCaption.textContent = img.alt
    openPopup(popupImage);
  })

  return photoElement;
}

//Реализованое добавление новых карточек на страницу
function newAddCardHandler (evt) {
  //отмена стандартной отправки формы
  evt.preventDefault();
  // создаем псевдомассив из вводимых данных
  const popupCardValue = {
   name: placeInput.value,
   link: photoInput.value
  };
  photoGrid.prepend(insertCard(popupCardValue));
  // отображаем на странице
  closePopup(popupAddCard);
};
//Прикрепляем обработчик к форме добавления карточек
popupAddCard.addEventListener('submit', newAddCardHandler);

//начальные Карточки на странице
initialCards.forEach(item =>{
  photoGrid.append(insertCard(item));
});
