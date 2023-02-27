import { showElement, hideElement } from './fullscreen.js';
import Filter from './filters.js';
import { collectfilters } from './data.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const cancelButton = imgUploadOverlay.querySelector('.cancel');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
const scaleControlSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const imageStyle = imgUploadPreview.children[0].style;

const setCloseUploadEventListener = () => {
  cancelButton.addEventListener('click', () => {
    hideElement(imgUploadOverlay);
    imgUploadForm.reset();
    imageStyle.filter = '';
    imageStyle.transform = '';
    removeFilter();
    value = SCALE_MAX;
  });
}

const setKeydownEscpaeEventListener = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      hideElement(imgUploadOverlay);
      imgUploadForm.reset();
      imageStyle.filter = '';
      imageStyle.transform = '';
      removeFilter();
      value = SCALE_MAX;
    }
  });
};

let value = SCALE_MAX;

const setTransform = () => {
  scaleControlValue.value = `${value}%`
  imageStyle.transform = `scale(${value / 100})`;
}

const setScaleControlSmallerEventListener = () => {
  scaleControlSmaller.addEventListener('click', () => {
    if (value > SCALE_MIN) {
      value -= SCALE_STEP;
      setTransform();
    }
  });
};

const setScaleControlBiggerEventListener = () => {
  scaleControlBigger.addEventListener('click', () => {
    if (value < SCALE_MAX) {
      value += SCALE_STEP;
      setTransform();
    }
  });
};

setScaleControlSmallerEventListener();
setScaleControlBiggerEventListener();

const removeFilter = () => {
  return new Filter(collectfilters).removeClass();
}

export const setUoloadFotoEventListener = () => {
  uploadFile.addEventListener('change', () => {
    showElement(imgUploadOverlay);
    scaleControlValue.value = `${SCALE_MAX}%`;
    // imgUploadPreview.children[0].src = uploadFile.value;
    setCloseUploadEventListener();
    setKeydownEscpaeEventListener();
  });
};

