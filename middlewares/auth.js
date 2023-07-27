// создание токена
const jwt = require('jsonwebtoken');
// подключаем обработчик нестандратных ошибок
const handleErrors = require('./handleErrors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return handleErrors({ name: 'UNAUTHORIZED_ERROR_MESSAGE' }, req, res, next);
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleErrors({ name: 'UNAUTHORIZED_ERROR_MESSAGE' }, req, res, next);
  }
  req.user = payload;
  return next();
};
