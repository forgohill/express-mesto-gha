// тут хранится схема и модель User

// подключаем монгус
const mongoose = require('mongoose');
// поключаем фукнцию—криптограф
const bcrypt = require('bcryptjs');
const { URL_REGEX } = require('../utils/constants');
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
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator(value) {
    //     return validator.isEmail(value);
    //   },
    //   message: 'Поле должно содержать Email адрес',
    // },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// создаем метод внутри схемы монгуста
userSchema.statics.findUserByCredentials = function (email, password) {
  // console.log(email, password);
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // проверим есть email или нет
      if (!user) {
        return Promise.reject(new Error('AUTHORISATION_ERROR_MESSAGE'));
      }
      // если нешел — сравним ХЭШ
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('AUTHORISATION_ERROR_MESSAGE'));
          }
          return user;
        })

    })

}


// создаем модель user на основе схемы Юзер
const User = mongoose.model('user', userSchema);

// экспортируем модель
module.exports = User;
