/**
  * 400 — переданы некорректные данные в методы создания карточки, пользователя;
  * обновления аватара пользователя или профиля;
  * 401 — ошибка авторизации;
  * 403 — доступ запрещен;
  * 409 — ошибка уникального поля;
  * 404 — карточка или пользователь не найден;
  * 500 — ошибка по-умолчанию;
*/
// поключаем фукнцию—криптограф
const bcrypt = require('bcryptjs');
// создание токена
const jwt = require('jsonwebtoken');
// импорт модели user
const User = require('../models/user');
// подключаем обработчик класса ошибки
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
// поддключаем файл с константами
const {
  STATUS_CODE,
  USER_NOT_FOUND_MESSAGE,
  NOT_UNIQUE_EMAIL_MESSAGE,
  ERROR_USER_DATA_MESSAGE,
  ERROR_USER_DATA_REDACT_MESSAGE,
  ERROR_USER_AVATAR_REDACT_MESSAGE,
} = require('../utils/constants');

// функция создания записи user
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          // eslint-disable-next-line no-param-reassign
          user.password = undefined;
          res.status(STATUS_CODE.SUCCESS_CREATE).send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new ErrorBadRequest(ERROR_USER_DATA_MESSAGE));
          }
          if (err.code === 11000) {
            return next(new ErrorConflict(NOT_UNIQUE_EMAIL_MESSAGE));
          }
          return next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  // принимаем емайл и пароль
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      return res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ _id: user._id });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id).select('+email')
    .then((user) => { res.send(user); })
    .catch(next);
};

// функция вызова списка user
const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

// функция вызова пользователя по ID
const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new ErrorNotFound(USER_NOT_FOUND_MESSAGE));
      }
      return res.send(user);
    })
    .catch(next);
};

// обновление User
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => (res.send(user)))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new ErrorBadRequest(ERROR_USER_DATA_REDACT_MESSAGE));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => (res.send(user)))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new ErrorBadRequest(ERROR_USER_AVATAR_REDACT_MESSAGE));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
};
