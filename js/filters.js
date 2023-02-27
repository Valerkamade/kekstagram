export default class Filter {
  constructor(data) {
    this._data = data;
    this._effects = document.querySelector('.img-upload__effects');
    this._image = document.querySelector('.img-upload__preview').children[0];
    this._inputs = this._effects.querySelectorAll('input');
  }

  _getInputCheckedId() {
    return this._effects.querySelector('input:checked').id;
  }

  _hendelCheckFilter() {
    this._classEffect = /effects__preview--.*/;
    this._effect = /(?<=effects__preview--).*/;
    this._image.classList.remove(this._classEffect.exec(this._image.className.split(' '))[0]);
    this._image.classList.add(`${this._data[this._getInputCheckedId()]}`);
  }

  _setEventListener() {
    this._image.classList.add('effects__preview--none');
    this._inputs.forEach((input) => {
      input.addEventListener('change', () => {
        this._hendelCheckFilter();
        this._inputId = input.id;
      });
    });
  }

  removeClass() {
    this._image.classList.remove(Array.prototype.at.call(this._image.classList, -1));
    this._image.classList.add('effects__preview--none');
  }

  getRun() {
    this._setEventListener();

  }
}
