import {popupEdit} from './constants.js' ; 
export class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name =  nameSelector;
    this._job = jobSelector;
    //console.log(this._name,this._job)
    this._nameInput = popupEdit.querySelector('.popup__item_type_name');
    this._jobInput = popupEdit.querySelector('.popup__item_type_profession');
  }

  //Возвращает объект с данными пользователей
  getUserInfo() {
    this._nameInput.value = this._name.textContent;
    this._jobInput.value = this._job.textContent;
  }

  //Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
  }
}