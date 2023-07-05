// подключаем модель Card
const Card = require('../models/card');

// функция создания карточки
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

// функция возвращает все карточки
const getCards = (req, res) => {
  console.log('getCards');

  Card.find({})
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

// функция удаляет конкретную карточку
const deleteCards = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((user) => {
      console.log(`${user} удалена`);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
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
    .then((user) => {
      console.log(`${user} удалена`);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

const deleteCardsLikes = (req, res) => {
  console.log('DELETE LIKES');
  // const { cardId } = req.params;

  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((user) => {
      console.log(`${user} удалена`);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
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