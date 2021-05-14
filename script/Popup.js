export class Popup {
  constructor(formSelector) {
    this._formSelector = formSelector;
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
    this._formSelector.classList.add('popup_opened');
    //добавление слушателя при нажатии на клавиатуру  
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener ('click', this._handleOverlayClose.bind(this));
  }

  close() {
    this._formSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    document.removeEventListener ('click', this._handleOverlayClose.bind(this));
  }

  setEventListeners() {
    this._formSelector.querySelector('.popup__close').addEventListener('click', ()=>{
      this.close();
    })
  }
  }

 