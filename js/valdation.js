export default class Vlidation {
  constructor(min, max) {
    this._textHashtags = document.querySelector('.text__hashtags');
    this._minLength = min;
    this._maxLength = max;
    this._pattern = new RegExp('^(?=.{2,20}$)#[0-9A-ZА-ЯЁ]+$', 'i');
  }

  _isValid(hashtag) {
    if (!this._pattern.test(hashtag)) {
      return this._textHashtags.setCustomValidity('xtuj');;
    }
  }
  _handleWriteHashtags() {
    this._hashtags = this._textHashtags.value.toLowerCase().trim();
    this._hashtagList = this._hashtags.split(/\s+/);
    let i = 1;
    this._hashtagList.forEach((hashtag) => {
      this._isValid(hashtag);
      this._hashtagLenght = hashtag.length;

      if (this._hashtagLenght < this._minLength) {
        this._textHashtags.setCustomValidity('Хеш-тег не может состоять только из символа #');
      } else if (this._hashtagLenght > this._maxLength) {
        this._textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (this._isValid(hashtag)) {
        this._textHashtags.setCustomValidity('Используются неразрешенные символы');
        // this._textHashtags.style.color = 'red';
      } else if (i >= 5) {
        this._textHashtags.setCustomValidity('Хэштегов более 5');

      } else {
        this._textHashtags.setCustomValidity('');
        // this._textHashtags.style.color = 'green';
      };

      i++;

    });


    // while (i < this._hashtagList.length) {
    //   if (this._hashtagList[i] === this._hashtagList[i - 1] + ' ') {
    //     consecutiveHashtagsCount++;
    //     if (consecutiveHashtagsCount >= this.maxConsecutiveHashtags) {
    //       this._textHashtags.setCustomValidity(`Хештеги идут подряд более ${this.maxConsecutiveHashtags} раз`);
    //       return false;
    //     }
    //   } else {
    //     consecutiveHashtagsCount = 0;
    //   }
    //   i++;
    // }

  }

  _setEventListener() {
    this._textHashtags.addEventListener('input', () => {
      this._handleWriteHashtags();
      this._textHashtags.reportValidity();
    });
  }

  enaibleValidation() {
    this._setEventListener();
    // console.log(this._textHashtags.validity);
    // console.log(this._textHashtags);
  }
}
