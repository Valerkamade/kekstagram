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

const setCloseUploadEventListener = () => {
  cancelButton.addEventListener('click', () => {
    hideElement(imgUploadOverlay);
    imgUploadForm.reset();
    imgUploadPreview.children[0].style = '';
    removeFilter();
  });
}

const setKeydownEscpaeEventListener = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      hideElement(imgUploadOverlay);
      imgUploadForm.reset();
      imgUploadPreview.children[0].style = '';
      removeFilter();
    }
  });
};

let value = SCALE_MAX;

const setScaleControlSmallerEventListener = () => {
  scaleControlValue.value = `${SCALE_MAX}%`;
  scaleControlSmaller.addEventListener('click', () => {
    if (value > SCALE_MIN) {
      value = value - SCALE_STEP;
      scaleControlValue.value = `${value}%`
      imgUploadPreview.children[0].style = `transform: scale(${value / 100})`;
    }
  });
};

const setScaleControlBiggerEventListener = () => {
  scaleControlBigger.addEventListener('click', () => {
    if (value < SCALE_MAX) {
      value = value + SCALE_STEP;
      scaleControlValue.value = `${value}%`
      imgUploadPreview.children[0].style = `transform: scale(${value / 100})`;
    } else {
      value = SCALE_MAX;
    }
  });
};

const removeFilter = () => {
  return new Filter(collectfilters).removeClass();
}

export const setUoloadFotoEventListener = () => {
  uploadFile.addEventListener('change', () => {
    showElement(imgUploadOverlay);

    // imgUploadPreview.children[0].src = uploadFile.path;
    setCloseUploadEventListener();
    setKeydownEscpaeEventListener();
    setScaleControlSmallerEventListener();
    setScaleControlBiggerEventListener()

  });
};

