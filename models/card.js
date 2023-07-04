// тут хранится схема и модель Card

// подключаем монгуста
const mongoose = require('mongoose');

// схема Card
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'user',
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// создаем модель card на основе схемы Юзер
const Card = mongoose.model('card', cardSchema);

// экспортируем модель
module.exports = Card;