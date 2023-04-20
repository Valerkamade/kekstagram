import Filter from './filters.js';
import Slider from './slider.js';
import Vlidation from './valdation.js';
import Api from './Api.js';
import Popup from './Popup.js';
import { renderPhoto } from './photo.js';
import { collectfilters, filterConfig, apiConfig } from './data.js';
import { setUploadFotoEventListener, imgUploadForm, handelCloseUpload } from './upload-file.js';

// const data = new FormData(imgUploadForm);
const dataFilters = collectfilters();

const filters = () => {
  return new Filter(dataFilters).getRun()
};

const slider = () => {
  return new Slider().getSlider();
}

const sliders = (elements) => {
  elements.forEach((element) => {
    new Slider(element).updateOptionsSlider();
  });
}

const validationForm = () => {
  const validation = new Vlidation(2, 20);
  return validation.enaibleValidation();
}

const popupError = new Popup('error');
const popupSuccess = new Popup('success');
const api = new Api(apiConfig);

api.getInitialPhotoApi()
  .then(res => renderPhoto(res))
  .catch(err => popupError.open(err));

// renderPhoto(createPosts());
setUploadFotoEventListener();
slider();
filters();
sliders(filterConfig);
validationForm();
document.body.append(popupError.createPopup());
document.body.append(popupSuccess.createPopup());
popupError.setEventListeners();
popupSuccess.setEventListeners();

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  api.addNewPhotodApi(new FormData(evt.target))
    .then(() => {
      handelCloseUpload();
      popupSuccess.open();
    })
    .catch(err => {
      handelCloseUpload();
      popupError.open(err)
    });
});

