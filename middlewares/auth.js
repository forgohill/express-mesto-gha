// создание токена
const jwt = require('jsonwebtoken');
// подключаем обработчик нестандратных ошибок
const handleErrors = require('./handleErrors');
// подключаем обработчик класса ошибки
const errorUnauthorized = require('../errors/errorUnauthorized');
// поддключаем файл с константами
const { UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    // return handleErrors({ name: 'UNAUTHORIZED_ERROR_MESSAGE' }, req, res, next);
    return next(new errorUnauthorized(UNAUTHORIZED_ERROR_MESSAGE))
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // return handleErrors({ name: 'UNAUTHORIZED_ERROR_MESSAGE' }, req, res, next);
    return next(new errorUnauthorized(UNAUTHORIZED_ERROR_MESSAGE))
  }
  req.user = payload;
  return next();
};
