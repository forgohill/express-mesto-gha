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
const {
  STATUS_CODE,
  ERROR_CARD_DATA_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  CARD_NO_ACCESS_DELETE_MESSAGE,
  ERROR_SERVER_MESSAGE,
  DATA_NOT_FOUND_MESSAGE,
} = require('../utils/constants');

// функция создания карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => {
      res.status(STATUS_CODE.SUCCESS_CREATE).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: ERROR_CARD_DATA_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

// функция возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ cards });
    })
    .catch(() => {
      res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
    });
};

// функция удаляет конкретную карточку
const deleteCards = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      // const { ownerId } = req.user._id;
      console.log(req.user._id);
      console.log(card);

      if (!card) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      } else if (card.owner.equals(req.user._id)) {
        card.deleteOne().then(() => { res.send({ message: 'Карточка удалена' }) });
      } else {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NO_ACCESS_DELETE_MESSAGE });
      }

      /**
       *
            if (!card) {
              return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
            } else if (card.owner.equals(req.user._id)) {
              console.log('СОВПАДЕНИЕ');
              return res.send(card);
            } else {
              return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NO_ACCESS_DELETE_MESSAGE });
            }
      */

    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: DATA_NOT_FOUND_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

// функция добавляет в массив likes userId
const putCardsLikes = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: DATA_NOT_FOUND_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

const deleteCardsLikes = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: DATA_NOT_FOUND_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      }
    });
};

// экспорт функций
module.exports = {
  createCard,
  getCards,
  deleteCards,
  putCardsLikes,
  deleteCardsLikes,
};
