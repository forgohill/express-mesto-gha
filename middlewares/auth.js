// подключаем jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // авторизационный заголовок

  console.log('я туты');
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'необходима авторизация' });
  }
  console.log('шаг 2')

  const token = authorization.replace('Bearer', '');

  console.log(token);

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // ошибка если не верифицировали токен
    return
    res
      .status(401)
      .send({ message: 'необходима авторизация' });
  }

  req.user = payload;
  next();
};