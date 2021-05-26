export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
        this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup'))  {
        this.close();
    }
  }
  
//функции открытия модального окна
  open() {
    this._popup.classList.add('popup_opened');
    //добавление слушателя при нажатии на клавиатуру  
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener ('click', this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener ('click', this._handleOverlayClose);

  }

  setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', ()=>{
      this.close();
    })
  }
  }