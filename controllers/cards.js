// подключаем модель Card
const Card = require('../models/card');
const {
  STATUS_CODE,
  ERROR_USER_DATA_REDACT_MESSAGE,
  ERROR_USER_AVATAR_REDACT_MESSAGE,
  ERROR_USER_DATA_STRING_MESSAGE,
  ERROR_USER_AVATAR_STRING_MESSAGE,
  ERROR_USER_DATA_MESSAGE,
  ERROR_CARD_DATA_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  ERROR_SERVER_MESSAGE,
  DATA_NOT_FOUND_MESSAGE } = require('../utils/constants');

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
  console.log('getCards');

  Card.find({})
    .then((cards) => {
      console.log(cards);
      res.send({ cards });
    })
    .catch((error) => {
      res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });

      /**
        console.log(error);
        res.status(400).send(error);
       */

    });
};

// функция удаляет конкретную карточку
const deleteCards = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      }

      console.log(`${card} удалена`);
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: DATA_NOT_FOUND_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      };

      /**
       *
      console.log(error);
      res.status(400).send(error);
       */
    });
};

// функция добавляет в массив likes userId
const putCardsLikes = (req, res) => {

  console.log('PUT LIKES');
  // const { cardId } = req.params;

  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      }
      console.log(`${card} лайк добавлен`);
      res.send(card);
    })
    .catch((error) => {

      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: DATA_NOT_FOUND_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      };

      // /**
      // console.log(error);
      // res.status(400).send(error);
      //  */

    });
};

const deleteCardsLikes = (req, res) => {
  console.log('DELETE LIKES');
  // const { cardId } = req.params;

  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
      }
      console.log(`${card} удален лайк`);
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        res.status(STATUS_CODE.DATA_ERROR).send({ message: DATA_NOT_FOUND_MESSAGE });
      } else {
        res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
      };
      // console.log(error);
      // res.status(400).send(error);
    });
};

// экспорт функций
module.exports = {
  createCard,
  getCards,
  deleteCards,
  putCardsLikes,
  deleteCardsLikes
};

/**
 * GET /cards — возвращает все карточки
 * POST /cards — создаёт карточку
 * DELETE /cards/:cardId — удаляет карточку по идентификатору
 *
 * PUT /cards/:cardId/likes — поставить лайк карточке
 * DELETE /cards/:cardId/likes — убрать лайк с карточки
 */