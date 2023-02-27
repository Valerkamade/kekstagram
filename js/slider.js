// import noUiSlider from 'nouislider';
// import 'nouislider/dist/nouislider.css'

export default class Slider {
  constructor(effect) {
    this._sliderElement = document.querySelector('.effect-level__slider');
    this._valueElement = document.querySelector('.effect-level__value');
    this._effect = effect;
    this._effects = document.querySelector('.img-upload__effects');
    this._image = document.querySelector('.img-upload__preview').children[0];
    this._effectLevel = document.querySelector('.img-upload__effect-level');
  }

  _createSlider() {
    this._valueElement.value = 100;
    noUiSlider.create(this._sliderElement, {
      range: {
        'min': 0,
        'max': 100
      },
      start: 100,
      step: 10,
      connect: 'lower',
    });
  };

  _getValueSlider() {
    this._sliderElement.noUiSlider.on('update', () => {
      this._value = this._sliderElement.noUiSlider.get();
      this._image.style.filter = `${this._effect.filter}(${this._value}${this._effect.mesure})`;
    });
  }

  _setParameters() {
    this._sliderElement.noUiSlider.updateOptions({
      range: {
        'min': this._effect.parametrs.min,
        'max': this._effect.parametrs.max,
      },
      step: this._effect.parametrs.step,
    })
    this._sliderElement.noUiSlider.set(this._effect.parametrs.max);
  }

  _handleSlider() {
        if (this._effect.effect !== 'effect-none') {
      this._image.style.filter = `${this._effect.filter}(${this._valueElement.value})`;
      this._effectLevel.classList.remove('hidden');
      this._setParameters();
      this._getValueSlider();
    } else {
      this._effectLevel.classList.add('hidden');
    }
  }

  _setEventListener() {
    this._input.addEventListener('change', () => {
      this._handleSlider();
    })
  };

  getSlider() {
    this._createSlider();
  }

  updateOptionsSlider() {
    this._input = this._effects.querySelector(`#${this._effect.effect}`);
    this._effectLevel.classList.add('hidden');
    this._setEventListener();
  }
}
