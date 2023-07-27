const jwt = require('jsonwebtoken')
const handleErrors = require('../middlewares/handleErrors');
module.exports = (req, res, next) => {
  console.log('старт авторизации');
  console.log(req.cookies.jwt);
  const token = req.cookies.jwt;
  console.log('шаг 1');

  if (!token) {
    // return res.status(401).send({ message: 'UNAUTHORIZED_ERROR_MESSAGE' });
    return handleErrors({ name: 'UNAUTHORIZED_ERROR_MESSAGE' }, req, res, next);
  }

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // ошибка если не верифицировали токен
    // return res.status(401).send({ message: 'UNAUTHORIZED_ERROR_MESSAGE' });
    return handleErrors({ name: 'UNAUTHORIZED_ERROR_MESSAGE' }, req, res, next);
  }

  req.user = payload;
  next();
}


/**
 *

// подключаем jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // авторизационный заголовок

  console.log('шаг 1');

  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'необходима авторизация' });
  }
  console.log('шаг 2')

  const token = authorization.replace('Bearer', '');

  // console.log(token);

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // ошибка если не верифицировали токен
    return res.status(401).send({ message: 'необходима авторизация' });
  }

  req.user = payload;
  next();
};

*/