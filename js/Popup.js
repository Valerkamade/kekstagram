export default class Popup {
  constructor(popupId) {
    this._popupId = popupId;
    this._popupTemplate = document.querySelector(`#${popupId}`);
    this._error = null;
  }

  _getTemplate() {
    const popupElement = this._popupTemplate
      .content
      .querySelector(`.${this._popupId}`)
      .cloneNode(true);

    return popupElement;
  }

  createPopup() {
    this._popup = this._getTemplate();
    this._button = this._popup.querySelector(`.${this._popupId}__button`);
    this._message = this._popup.querySelector(`.${this._popupId}__title`);
    this._popup.classList.add('hidden');

    return this._popup;
  }

  // Метод закрытия попапа по Escape
  _handleEscClose = (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      this.close();
    };
  }

  // Метод закрытия попапа по оверлею
  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  // Метод отображения загрузки
  // renderLoading(isLoading, loadingText) {
  //   if (!this._buttonSubmit) return;
  //   if (isLoading) {
  //     this.defaultText = this._buttonSubmit.textContent;
  //     this._buttonSubmit.textContent = loadingText;
  //   } else {
  //     this._buttonSubmit.textContent = this.defaultText;
  //   }
  // }

  // Метод открытия попапа с навешиванием слушателя закрытия по Escape
  open(error) {
    this._error = error;
    this._popup.classList.remove('hidden');
    document.addEventListener('keydown', this._handleEscClose);

    if (!this._error) {
      return ;
    } else {
      this._message.style.fontSize = '22px';
      this._message.textContent = this._error;
      this._button.textContent = 'Закрыть';
    }
  }

  // Метод закрытия попапа со снятием слушателя закрытия по Escape
  close() {
    this._popup.classList.add('hidden');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Метод установки слушателей
  setEventListeners() {
    this._button.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (evt) =>{
      this._handleOverlayClose(evt)
    });
  }
}
