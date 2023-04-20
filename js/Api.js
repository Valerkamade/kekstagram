export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    // this._authorization = headers['authorization'];
    this._headers = headers;
  }

  // Метод проверки успешности запроса
  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то где-то пошло как-то не так... Код ошибки ${res.status}`);
  }

  // Метод запроса с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then(this._isOk)
  }

  // метод запроса данных фото с сервера
  getInitialPhotoApi() {
    return this._request(`${this._baseUrl}/data`)
  }

  // Метод запроса данных пользователя с сервера
  getUserInfoApi() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
  }

  // Метод добавления новой фотографии на сервер
  addNewPhotodApi(body) {
    return this._request(`${this._baseUrl}`, {
      method: 'POST',
      // headers: this._headers,
      body,
    })
  }
}
