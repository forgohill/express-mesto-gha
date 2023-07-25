// импорт модели user
const User = require('../models/user');

// создание токена
const jwt = require('jsonwebtoken');

// поключаем фукнцию—криптограф
const bcrypt = require('bcryptjs');

const {
  STATUS_CODE,
  ERROR_USER_DATA_REDACT_MESSAGE,
  ERROR_USER_AVATAR_REDACT_MESSAGE,
  ERROR_USER_DATA_STRING_MESSAGE,
  ERROR_USER_AVATAR_STRING_MESSAGE,
  ERROR_USER_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  ERROR_SERVER_MESSAGE,
  DATA_NOT_FOUND_MESSAGE,
} = require('../utils/constants');

// функция создания записи user
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => {
          user.password = undefined;
          res.status(STATUS_CODE.SUCCESS_CREATE).send(user)
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(400).send({ message: 'имя пользователя занято' });
          }
          else { return res.status(400).send(err); }
        })
    })

};

/**
 * старая 13 пр *
 *
const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  User.create({ name, about, avatar, email, password })
    .then((user) => res.status(STATUS_CODE.SUCCESS_CREATE).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: ERROR_USER_DATA_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};
 */

// функция вызова списка user
const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => {
      res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
    });
};

// функция вызова пользователя по ID
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: DATA_NOT_FOUND_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

// обновление User
const updateUser = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(STATUS_CODE.DATA_ERROR).send({ message: ERROR_USER_DATA_STRING_MESSAGE });
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: ERROR_USER_DATA_REDACT_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    return res.status(STATUS_CODE.DATA_ERROR).send({ message: ERROR_USER_AVATAR_STRING_MESSAGE });
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: ERROR_USER_AVATAR_REDACT_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};



const login = (req, res) => {
  // принимаем емайл и пароль
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
}

const getUserInfo = (req, res) => {
  // console.log(req.user);

  User.findById(req.user._id).select('+email')
    .then((user) => { res.send(user); })
    .catch(
      (err) => {
        res
          .status(401)
          .send({ message: err.message });
      }
    )
}


module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  login,
  getUserInfo
};
