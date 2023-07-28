// тут хранится схема и модель Card

// подключаем монгуста
const mongoose = require('mongoose');

const { URL_REGEX } = require('../utils/constants');

// схема Card
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return URL_REGEX.test(url);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

// создаем модель Card на основе схемы card
const Card = mongoose.model('card', cardSchema);

// экспортируем модель
module.exports = Card;
