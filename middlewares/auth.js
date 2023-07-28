// создание токена
const jwt = require('jsonwebtoken');
// подключаем обработчик класса ошибки
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
// поддключаем файл с константами
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorUnauthorized(UNAUTHORIZED_ERROR_MESSAGE));
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new ErrorUnauthorized(UNAUTHORIZED_ERROR_MESSAGE));
  }
  req.user = payload;
  return next();
};
