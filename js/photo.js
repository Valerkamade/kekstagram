const pictureTemplate = document.querySelector('#picture').content;
const pictureElement = pictureTemplate.querySelector('.picture');
const picturesGillery = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const createPhoto = (obj) => {
  const newPicture = pictureElement.cloneNode(true);
  const pictureImg = newPicture.querySelector('.picture__img');
  const pictureLike = newPicture.querySelector('.picture__likes');
  const pictureComments = newPicture.querySelector('.picture__comments');

  pictureImg.src = obj.url;
  pictureLike.textContent = obj.likes;
  pictureComments.textContent = obj.comments.length;

  return newPicture;
};

const renderPhoto = (data) => {
  data.forEach((element) => {
    picturesFragment.append(createPhoto(element));
  });
  picturesGillery.append(picturesFragment);
}

export { renderPhoto };
