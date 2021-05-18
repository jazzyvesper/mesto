export class Card {
  constructor(cardData, cardSelector, handleCardClick) {
    this._link = cardData.link;
    this._alt = cardData.name
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    
  }

  // Генерация карточекthis._element.querySelector('.photo-card__image')
  _getTemplate() {
    // клонируем содержимое тега template
    const photoElement = document.querySelector(this._cardSelector).content.querySelector('.photo-card').cloneNode(true);
    return photoElement;
  }
     
  // наполняем содержимым
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-card__icon_type_like');
    this._cardImage = this._element.querySelector('.photo-card__image')
    const photoCardTitle = this._element.querySelector('.photo-card__title'); 
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    photoCardTitle.textContent = this._alt;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-card__icon_type_basket').addEventListener('click', ()=>{
      this._handleRemoveCard();
    })
    this._likeButton.addEventListener('click', ()=>{
      this._handleLikeCard();
    })

    this._cardImage.addEventListener('click', ()=>{
        this._handleCardClick(); 
    })   
  }

  _handleRemoveCard(){
    this._element.closest('.photo-card').remove();
  };

  _handleLikeCard() {
    this._likeButton.classList.toggle('photo-card__icon_type_like-active');
  };
}