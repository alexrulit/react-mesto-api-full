class Api {
    constructor(options){
      this._baseUrl = options.baseUrl;
      this._token = options.headers.token;
      this._contentType = options.headers.contentType;
    }
  
    _sendRequest(endpoint, method, body){
      this._headers = {
          'Authorization': `Bearer ${this._token}`,
          'Content-type': this._contentType
      };
      this._requestInit = {
        method: method,
        headers: this._headers
      };
      if(method === 'POST' || method === 'PATCH'){
        this._requestInit.body = body;
      }
      return fetch(`${this._baseUrl}${endpoint}`, this._requestInit)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }

    setToken(token) {
      this._token = token;
    } 
  
    getUserInfo() {
      return this._sendRequest('/users/me', 'GET', {});
    }
  
    getInitialCards() {
      return this._sendRequest('/cards', 'GET', {});
    }
  
    setUserInfo(name, about) {
      this._body = JSON.stringify({
          name: name,
          about: about
      });
      return this._sendRequest('/users/me', 'PATCH', this._body);
    }
  
    addNewCard(name, link) {
      this._body = JSON.stringify({
          name: name,
          link: link
      });
      return this._sendRequest('/cards', 'POST', this._body);
    }
  
    cardLike(cardId, state) {
      this._cardId = cardId;
      this._method =  state ? 'DELETE' : 'PUT';
      return this._sendRequest('/cards/likes/' + this._cardId, this._method, {});
    }
  
    deleteCard(cardId) {
      this._cardId = cardId;
      return this._sendRequest('/cards/' + this._cardId, 'DELETE', {});
    }
  
    setAvatar(avatarLink) {
      this._body = JSON.stringify({
          avatar: avatarLink
      });
      return this._sendRequest('/users/me/avatar', 'PATCH', this._body);
    }
  }
  
  const api = new Api({
    baseUrl: 'http://localhost:3001',
    headers: {
      token: localStorage.getItem('jwt'),
      contentType: 'application/json'
    }
  });

  export default api;