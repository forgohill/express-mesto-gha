// тут хранится схема и модель User
// подключаем монгус
const mongoose = require('mongoose');
// поключаем фукнцию—криптограф
const bcrypt = require('bcryptjs');
// подключаем обработчик класса ошибки
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
// поддключаем файл с константами
const {
  URL_REGEX,
  AUTHORISATION_ERROR_MESSAGE,
} = require('../utils/constants');

// схема User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return URL_REGEX.test(url);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// создаем метод внутри схемы монгуста
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // проверим есть email или нет
      if (!user) {
        return Promise.reject(new ErrorUnauthorized(AUTHORISATION_ERROR_MESSAGE));
      }
      // если нешел — сравним ХЭШ
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized(AUTHORISATION_ERROR_MESSAGE));
          }
          return user;
        });
    });
};

// создаем модель user на основе схемы Юзер
const User = mongoose.model('user', userSchema);
// экспортируем модель
module.exports = User;
