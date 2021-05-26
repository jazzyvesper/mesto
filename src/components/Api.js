export class Api {
    constructor ({address, token}) {
      this._address = address;
      this._token = token;
    }
  
    getCards() {
      return fetch(`${this._address}/cards`, {
        headers: {
          authorization: this._token
        }
      })
    }
  
    getinfo() {
      return fetch(`${this._address}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
    }
  
    changeInfo(data) {
      return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data['first-name'],
          about: data.profession
        })
      })
    }
  
    createNewCard(data) {
     return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      }); 
    }
  
     deleteCard(id) {
      return fetch(`${this._address}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
    }
  
    addLikes(id) {
      return fetch(`${this._address}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
    }
  
    deleteLikes(id) {
      return fetch(`${this._address}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        }
      })
    }
  
    changeAvatar(newLink) {
      return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          avatar: newLink.avatarlink
        })
      })
    }
  }