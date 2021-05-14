
//Находим Popup и его элементы в DOM
export const popupEdit = document.querySelector('.popup_type_edit');
export const openPopupBtn = document.querySelector('.profile__edit-button');
export const closePopupBtn = popupEdit.querySelector('.popup__close');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupImage = document.querySelector('.popup_type_image');
export const closePopupImageBtn = popupImage.querySelector('.popup__close');
export const openPopupAddCardBtn = document.querySelector('.profile__add-button');
export const closePopupAddCardBtn = popupAddCard.querySelector('.popup__close');

// Находим изображение и подпись 
export const imageElement = popupImage.querySelector('.popup__image');
export const imageCaption = popupImage.querySelector('.popup__caption');

//находим форму и поля формы в DOM
export const nameInput = popupEdit.querySelector('.popup__item_type_name');
export const jobInput = popupEdit.querySelector('.popup__item_type_profession');
export const profileNameElement = document.querySelector('.profile__title');
export const profileJobElement = document.querySelector('.profile__subtitle');

//Добавление карточек на страницу
export const addformElement = popupAddCard.querySelector('.popup__form');
export const placeInput = addformElement.querySelector('.popup__item_type_place');
export const photoInput = addformElement.querySelector('.popup__item_type_link');
export const photoGrid = document.querySelector('.photo-grid');
