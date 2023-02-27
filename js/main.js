import { renderPhoto } from './photo.js';
import { createPosts, collectfilters, filterConfig } from './data.js';
import { setUoloadFotoEventListener } from './upload-file.js';
import Filter from './filters.js';
import Slider from './slider.js';

renderPhoto(createPosts());
setUoloadFotoEventListener();

const dataFilters = collectfilters();

const filters = () => {
  return new Filter(dataFilters).getRun()
};

filters();

new Slider().getSlider();

const slider = (elements) => {
  elements.forEach((element) => {
  new Slider(element).updateOptionsSlider();
});
}

slider(filterConfig);
