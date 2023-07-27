/**
 *
// КОСТАНТЫ СТАТУСОВ
const STATUS_CODE = {
  SUCCESS_DONE: 200,
  SUCCESS_CREATE: 201,
  DATA_ERROR: 400,
  AUTH_ERROR: 401,
  ACCESS_IS_DENIED: 403,
  NOT_FOUND: 404,
  DATA_DUBLICATE: 409,
  SERVER_ERROR: 500,
};
// КОНСТАНТЫ ВАЛДАЦИИ
const URL_REGEX = /https?:\/\/(www)?[0-9a-zA-Z-._~:/?#\[\]@!\$&'\(\)\*\+,;=]+\.\w{2,3}/

// КОНСТАНТЫ СООБЩЕНИЙ
const ERROR_USER_DATA_REDACT_MESSAGE = 'Переданы некорректные данные или _id при редактировании пользователя';
const ERROR_USER_AVATAR_REDACT_MESSAGE = 'Переданы некорректные данные или _id при редактировании аватара пользователя';
const ERROR_USER_DATA_STRING_MESSAGE = 'Ошибка в именовании поля name или about';
const ERROR_USER_AVATAR_STRING_MESSAGE = 'Ошибка в именовании поля avatar';
const ERROR_USER_DATA_MESSAGE = 'Переданы некорректные данные  при создании пользователя';
const ERROR_CARD_DATA_MESSAGE = 'Переданы некорректные данные при создании карточки';
const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным _id не найден';
const CARD_NOT_FOUND_MESSAGE = 'Карточка с указанным _id не найдена';
const CARD_NO_ACCESS_DELETE_MESSAGE = 'У Вас нет прав для удаления данной карточки';
const ERROR_SERVER_MESSAGE = 'Произошла ошибка на сревере';
const DATA_NOT_FOUND_MESSAGE = 'Данные не найдены';
const SUCCESSFUL_REMOVE_MESSAGE = 'Карточка удалена';
const ERROR_REMOVE_NOT_RIGHTS_MESSAGE = 'Нет прав для удаления пользователя, карточка принадлежит другому пользователю';
const NOT_UNIQUE_EMAIL_MESSAGE = 'Пользователь с таким email уже зарегистрирован';
const AUTHORISATION_ERROR_MESSAGE = 'Ошибка авторизации';
const UNAUTHORIZED_ERROR_MESSAGE = 'Ошибка, требуется авторизация';
const EMPTY_NAME_MESSAGE = 'Поле «Название» не может быть пустым';
const EMPTY_LINK_MESSAGE = 'Поле «Ссылка на картинку» не может быть пустым';
const URL_NOT_FOUND = 'URL запроса не существует';
 */

const {
  STATUS_CODE,
  ERROR_USER_DATA_REDACT_MESSAGE,
  ERROR_USER_AVATAR_REDACT_MESSAGE,
  ERROR_USER_DATA_STRING_MESSAGE,
  ERROR_USER_AVATAR_STRING_MESSAGE,
  ERROR_USER_DATA_MESSAGE,
  ERROR_CARD_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  CARD_NO_ACCESS_DELETE_MESSAGE,
  ERROR_SERVER_MESSAGE,
  DATA_NOT_FOUND_MESSAGE,
  SUCCESSFUL_REMOVE_MESSAGE,
  ERROR_REMOVE_NOT_RIGHTS_MESSAGE,
  NOT_UNIQUE_EMAIL_MESSAGE,
  AUTHORISATION_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  EMPTY_NAME_MESSAGE,
  EMPTY_LINK_MESSAGE,
  URL_NOT_FOUND,
} = require('../utils/constants');

module.exports = handleErrors = (err, req, res, next) => {
  if (err.name === 'URL_NOT_FOUND') {
    console.log('ошибка была в обработчике ошибок «404»')
    res.status(STATUS_CODE.NOT_FOUND).send({ message: URL_NOT_FOUND });
  }
  if (err.code === 11000) {
    console.log('ошибка была в обработчике ошибок «409»')
    res.status(STATUS_CODE.DATA_DUBLICATE).send({ message: NOT_UNIQUE_EMAIL_MESSAGE });
  }
  // if (err.statusCode === STATUS_CODE.DATA_ERROR) {
  //   console.log('ошибка была в обработчике ошибок «400»')
  //   res.status(STATUS_CODE.DATA_DUBLICATE).send({ message: NOT_UNIQUE_EMAIL_MESSAGE });
  // }
  if (err.message === 'AUTHORISATION_ERROR_MESSAGE') {
    console.log('ошибка была в обработчике ошибок «401»')
    res.status(STATUS_CODE.AUTH_ERROR).send({ message: AUTHORISATION_ERROR_MESSAGE });
  }
  if (err.name === 'UNAUTHORIZED_ERROR_MESSAGE') {
    console.log('ошибка была в обработчике ошибок «401»')
    res.status(STATUS_CODE.AUTH_ERROR).send({ message: UNAUTHORIZED_ERROR_MESSAGE });
  }
  return next();
};