// тут хранится схема и модель User

// подключаем монгус
const mongoose = require('mongoose');
// поключаем фукнцию—криптограф
const bcrypt = require('bcryptjs');

// схема User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив-Кусто',
  },
  about: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    // required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

// создаем метод внутри схемы монгуста
userSchema.statics.findUserByCredentials = function (email, password) {
  // console.log(email, password);
  return this.findOne({ email }).select('+password')
    .then((user) => {
      // проверим есть email или нет
      if (!user) {
        return Promise.reject(new Error('неверные почта или пароль'));
      }
      // если нешел — сравним ХЭШ
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            Promise.reject(new Error(' __ неверные почта или пароль'));
          }
          return user;
        })

    })

}


// создаем модель user на основе схемы Юзер
const User = mongoose.model('user', userSchema);

// экспортируем модель
module.exports = User;
