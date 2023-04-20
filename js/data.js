import { getRandomInt } from './util.js';

const POSTS_COUNT = 25;

const MIN_AVATAR = 1;
const MAX_AVATAR = 6;

const MIN_ID_PHOTO = 1;
const MAX_ID_PHOTO = 25;

const MIN_ID_USERS = 1;
const MAX_ID_USERS = 250;

const MIN_URL = 1;
const MAX_URL = 25;

const MIN_LIKS = 15;
const MAX_LIKS = 200;

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 5;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Мария',
  'Владлен',
  'Ярополк',
  'Ефросинья',
  'Константин',
  'Виолета',
]

const DESCRIPTIONS = [
  'Если смогу, я сделаю это. Конец истории.',
  'Смейтесь как только умеете, любите столько, сколько живете.',
  'Помните: вы единственный человек, который может наполнить ваш мир солнечным светом.',
  'Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали.',
  'Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах.',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон.',
  'Улыбка — единственный тренд в моде, который актуален всегда.',
  'Никогда не ищите свое счастье там, где вы его однажды потеряли.',
  'Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой.',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Всегда начинайте свой день с хороших людей и кофе.',
  'Ни о чем не беспокойтесь. Потому что все лучшие умы на работе.',
  'Жизнь — это всего лишь серия крошечных чудес, поэтому обратите внимание на них.',
  'Живите во всех тех моментах, которые вы не можете выразить словами.',
  'Не ждите идеального момента. Берите каждый момент и делайте его идеальным.',
  'Признай это.Без меня, твоя жизнь была бы действительно скучной.',
  'Будьте счастливы в этот момент, потому что этот момент — и есть ваша жизнь.',
  'Я пыталась заниматься йогой, но в позе лотоса уснула.',
  'Я, возможно, никогда не буду лучшей, но я стараюсь быть лучшей твоей.',
  'Если вам никто не улыбнулся утром, я подарю вам одну из своих.',
  'Никогда не позволяйте никому скучать.',
  'Все только начинает становиться действительно хорошим.',
  'Я опять съела сладкое. А все потому, что каждую секунду в мире 200 человек празднуют свой день рождения!',
  'Мечтайте.Поверьте, в это. Добейтесь этого.',
  'Утром, только одна хорошая мысль меняет смысл целого дня.',
];

const getRandomArrayElement = (elements) => {
  const number = getRandomInt(0, elements.length - 1);
  return elements[number];
};

const getRandomArrayElementNoRepeat = (elements) => {
  return elements.shift();
};

const randomNumberNoRepeat = (min, max) => {
  let numbers = new Array(max);
  for (let i = 0; i < numbers.length; i++) {
    let number = getRandomInt(min, max);
    while (numbers.includes(number)) {
      number = getRandomInt(min, max);
    }
    numbers[i] = number;
  }
  return numbers;
};

const avatars = randomNumberNoRepeat(MIN_AVATAR, MAX_AVATAR);
const numbrsPhoto = randomNumberNoRepeat(MIN_ID_PHOTO, MAX_ID_PHOTO);
const urls = randomNumberNoRepeat(MIN_URL, MAX_URL);
const users = randomNumberNoRepeat(MIN_ID_USERS, MAX_ID_USERS);
const comments = randomNumberNoRepeat(MIN_COMMENTS, MAX_COMMENTS);

const createComment = () => {
  return {
    id: getRandomArrayElementNoRepeat(users),
    avatar: 'img/avatar-' + `${getRandomArrayElement(avatars)}` + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};
const createPhoto = () => {
  return {
    id: getRandomArrayElementNoRepeat(numbrsPhoto),
    url: 'photos/' + `${getRandomArrayElementNoRepeat(urls)}` + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInt(MIN_LIKS, MAX_LIKS),
    comments: new Array(getRandomArrayElement(comments)).fill(null).map(() => createComment()),
  };
};

const createPosts = () => new Array(POSTS_COUNT).fill(null).map(() => createPhoto());

const collectfilters = () => {
  const filters = {};
  const inputList = Array.from(document.querySelectorAll('.effects__radio'))
  inputList.forEach((inputElement) => {
    const item = inputElement.closest('.effects__item');
    const span = item.querySelector('.effects__preview');
    const filterId = inputElement.id;

    filters[filterId] = span.classList[1];
  });
  return filters;
};

const filterConfig = [
  {
    effect: 'effect-none',
  },
  {
    effect: 'effect-chrome',
    parametrs: {
      max: 1,
      min: 0,
      step: 0.1,
    },
    filter: 'grayscale',
    mesure: '',
  },
  {
    effect: 'effect-sepia',
    parametrs: {
      max: 1,
      min: 0,
      step: 0.1,
    },
    filter: 'sepia',
    mesure: '',
  },
  {
    effect: 'effect-marvin',
    parametrs: {
      max: 100,
      min: 0,
      step: 1,
    },
    filter: 'invert',
    mesure: '%',
  },
  {
    effect: 'effect-phobos',
    parametrs: {
      max: 3,
      min: 0,
      step: 0.1,
    },
    filter: 'blur',
    mesure: 'px',
  },
  {
    effect: 'effect-heat',
    parametrs: {
      max: 3,
      min: 1,
      step: 0.1,
    },
    filter: 'brightness',
    mesure: '',
  }
]

const apiConfig = {
  baseUrl: 'https://23.javascript.pages.academy/kekstagram',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}

export { createPosts, collectfilters, filterConfig, apiConfig };
