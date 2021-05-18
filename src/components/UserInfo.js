export class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  //Возвращает объект с данными пользователей
  getUserInfo() {
    const dataUserInfo = {};
    dataUserInfo.name = this._name.textContent;
    dataUserInfo.job = this._job.textContent;
    return dataUserInfo;
  }

  //Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
  }
}