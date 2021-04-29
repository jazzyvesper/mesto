export class Card {
  constructor(cardData, cardSelector, handleOpenImage) {
    this._link = cardData.link;
    this._alt = cardData.name
    this._cardSelector = cardSelector;
    this._handleOpenImage = handleOpenImage;
  }

  // Генерация карточек
  _getTemplate() {
    // клонируем содержимое тега template
    const photoElement = document.querySelector(this._cardSelector).content.querySelector('.photo-card').cloneNode(true);
    return photoElement;
  }
     
  // наполняем содержимым
  generateCard() {
    this._element = this._getTemplate();
    const photoCardImage = this._element.querySelector('.photo-card__image');
    const photoCardTitle = this._element.querySelector('.photo-card__title'); 
    photoCardImage.src = this._link;
    photoCardImage.alt = this._alt;
    photoCardTitle.textContent = this._alt;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-card__icon_type_basket').addEventListener('click', ()=>{
      this._handleRemoveCard();
    })
    this._element.querySelector('.photo-card__icon_type_like').addEventListener('click', ()=>{
      this._handleLikeCard();
    })

    this._element.querySelector('.photo-card__image').addEventListener('click', ()=>{
        this._handleOpenImage(this._alt, this._link); 
    })   
  }

  _handleRemoveCard(){
    this._element.closest('.photo-card').remove();
  };

  _handleLikeCard() {
    this._element.querySelector('.photo-card__icon_type_like').classList.toggle('photo-card__icon_type_like-active');
  };
}
