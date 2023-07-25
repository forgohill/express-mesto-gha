/**
 * 400 — переданы некорректные данные в методы создания карточки, пользователя,
 * обновления аватара пользователя или профиля;
 * 404 — карточка или пользователь не найден.
 * 500 — ошибка по-умолчанию.
 */

const STATUS_CODE = {
  SUCCESS_CREATE: 201,
  DATA_ERROR: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

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

module.exports = {
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
};
