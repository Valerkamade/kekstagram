// Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInt = (min, max) => {
  if (min >= max || min < 0) {
    return -1;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум не включается, минимум включается
}

// Функция для проверки максимальной длины строки
const getStringLength = (string, maxLenght) => string.length <= maxLenght;

export {getRandomInt, getStringLength};
