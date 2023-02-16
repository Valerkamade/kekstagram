const bigPictuer = document.querySelector('.big-picture');
const bigPictureImg = bigPictuer.querySelector('.big-picture__img');
const likesCount = bigPictuer.querySelector('.likes-count');
const commentsCount = bigPictuer.querySelector('.comments-count');
const socialCaption = bigPictuer.querySelector('.social__caption');
const socialCommentCount = bigPictuer.querySelector('.social__comment-count');
const commentsLoader = bigPictuer.querySelector('.comments-loader');
const commentsFragment = document.createDocumentFragment();
const socialComments = bigPictuer.querySelector('.social__comments');
const cancelButton = bigPictuer.querySelector('.cancel');
const commentTemplate = document.querySelector('#comment').content;
const commentElement = commentTemplate.querySelector('.social__comment');

const visibility = (element) => {
  element.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hidden = (element) => {
  element.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const setCloseButtonEventListener = () => {
  cancelButton.addEventListener('click', () => {
    hidden(bigPictuer);
  });
};

const setKeydownEscpaeEventListener = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      hidden(bigPictuer);
    }
  });
};

const createComment = (obj) => {
  const newComment = commentElement.cloneNode(true);
  const socialPicture = newComment.querySelector('.social__picture');
  const socialText = newComment.querySelector('.social__text');

  socialComments.innerHTML = '';

  socialPicture.src = obj.avatar;
  socialPicture.alt = obj.name;
  socialText.textContent = obj.message;

  return newComment;
};

const renderComments = (obj) => {
  obj.forEach((element) => {
    commentsFragment.append(createComment(element));
  });
  socialComments.append(commentsFragment);
}

const setOpenBigPictuerEventListener = (photo, obj) => {
  photo.addEventListener('click', (evt) => {
    evt.preventDefault();
    visibility(bigPictuer);

    bigPictureImg.children[0].src = obj.url;
    likesCount.textContent = obj.likes;
    commentsCount.textContent = obj.comments.length;
    socialCaption.textContent = obj.description;

    renderComments(obj.comments);

    hidden(socialCommentCount);
    hidden(commentsLoader);

    setCloseButtonEventListener();
    setKeydownEscpaeEventListener();
  });
};

export { setOpenBigPictuerEventListener };
