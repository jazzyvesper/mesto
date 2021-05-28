export class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  //Возвращает объект с данными пользователей
  getUserInfo() {
    const dataUserInfo = {};
    dataUserInfo.name = this._name.textContent;
    dataUserInfo.job = this._job.textContent;
    return dataUserInfo;
  }

  //Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.about;
    this._userID =userData._id
  }

  setUserAvatar(userData) {
    this._avatar.src = userData.avatar;
  }

  getUserId() {
    return this._userID
  }
}