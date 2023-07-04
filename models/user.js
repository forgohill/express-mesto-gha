// тут хранится модель Юзер

// подключаем монгус
const mongoose = require('mongoose');

// схема Юзер
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
  },
});

// создаем модель user на основе схемы Юзер
const User = mongoose.model('user', userSchema);

// экспортируем модель
module.exports = User;