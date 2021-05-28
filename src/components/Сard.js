export class Card {
  constructor(cardData, cardSelector, handleCardClick, submitHandler, api, currentUser) {
    this._link = cardData.link;
    this._alt = cardData.name;
    this._owner = cardData.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._like = cardData.likes;
    this._id = cardData._id;
    this._submitHandler = submitHandler;
    this._myId = currentUser
    this._api = api;
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
    this._likeButton = this._element.querySelector('.photo-card__icon_type_like');
    this._cardImage = this._element.querySelector('.photo-card__image')
    const photoCardTitle = this._element.querySelector('.photo-card__title'); 
    this._quantityLikes = this._element.querySelector('.photo-card_icon_type_number-like')
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    //Пункт 5. Отображение количества лайков карточки
    this._quantityLikes.textContent = this._like.length
    photoCardTitle.textContent = this._alt;
    if (this._owner === this._myId) {
      this._element.querySelector('.photo-card__icon_type_basket').classList.remove('photo-card__icon-hidden')
    }
    const userlikes = this._like.find(item => item._id == this._myId)
        if (userlikes) {
          this._likeButton.classList.add('photo-card__icon_type_like-active');
        }else {
          this._likeButton.classList.remove('photo-card__icon_type_like-active');
        }
    this._setEventListeners();
    return this._element;
    
  }

  /// получение id карточки
  getId() {
    return this._id;
  }

  //8. Постановка и снятие лайка
  _settingLikes() {
    const activeButton = this._likeButton.classList.contains('photo-card__icon_type_like-active')
    if(!activeButton) {
      this._api.addLikes(this.getId())
      .then((res)=> {
        const pluslikes = res.likes.length ++;
        this._quantityLikes.textContent = pluslikes;
        this._handleLikeCard()
      })
      .catch(err => console.log(`Ошибка при добавлении лайка: ${err}`))
    }else {
      this._api.deleteLikes(this.getId())
      .then((res)=> {
        this._quantityLikes.textContent =  res.likes.length;
        this._handleLikeCard()
      })
      .catch(err => console.log(`Ошибка при удалении лайка: ${err}`))
    } 
  }

  _setEventListeners() {
    this._element.querySelector('.photo-card__icon_type_basket').addEventListener('click', ()=>{
      this._submitHandler()
    })

    this._likeButton.addEventListener('click', ()=>{
      this._settingLikes()
    })

    this._cardImage.addEventListener('click', ()=>{
        this._handleCardClick(); 
    })   
  }

  handleRemoveCard(){
    this._element.closest('.photo-card').remove();
  };

  _handleLikeCard() {
    this._likeButton.classList.toggle('photo-card__icon_type_like-active');
  };
}