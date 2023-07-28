/**
 * GET /cards — возвращает все карточки
 * POST /cards — создаёт карточку
 * DELETE /cards/:cardId — удаляет карточку по идентификатору
 *
 * PUT /cards/:cardId/likes — поставить лайк карточке
 * DELETE /cards/:cardId/likes — убрать лайк с карточки
 */

// подключаем модель Card
const Card = require('../models/card');
// подключаем обработчик класса ошибки
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');

// поддключаем файл с константами
const {
  STATUS_CODE,
  SUCCESSFUL_REMOVE_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  CARD_NO_ACCESS_DELETE_MESSAGE,
} = require('../utils/constants');

// функция создания карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => (res.status(STATUS_CODE.SUCCESS_CREATE).send(card)))
    .catch(next);
};

// функция возвращает все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => (res.send({ cards })))
    .catch(next);
};

// функция удаляет конкретную карточку
const deleteCards = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new ErrorNotFound(CARD_NOT_FOUND_MESSAGE));
      }
      if (card.owner.equals(req.user._id)) {
        return card.deleteOne()
          .then(() => (res.send({ message: SUCCESSFUL_REMOVE_MESSAGE })))
          .catch(next);
      }
      return next(new ErrorForbidden(CARD_NO_ACCESS_DELETE_MESSAGE));
    })
    .catch(next);
};

// функция добавляет в массив likes userId
const putCardsLikes = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new ErrorNotFound(CARD_NOT_FOUND_MESSAGE));
      }
      return res.send(card);
    })
    .catch(next);
};

const deleteCardsLikes = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return next(new ErrorNotFound(CARD_NOT_FOUND_MESSAGE));
      }
      return res.send(card);
    })
    .catch(next);
};

// экспорт функций
module.exports = {
  createCard,
  getCards,
  deleteCards,
  putCardsLikes,
  deleteCardsLikes,
};
