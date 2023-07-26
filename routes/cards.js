/**
 * GET /cards — возвращает все карточки
 * POST /cards — создаёт карточку
 * DELETE /cards/:cardId — удаляет карточку по идентификатору
 *
 * PUT /cards/:cardId/likes — поставить лайк карточке
 * DELETE /cards/:cardId/likes — убрать лайк с карточки
 */

const router = require('express').Router();
const validations = require('../middlewares/validations');
const {
  createCard,
  getCards,
  deleteCards,
  putCardsLikes,
  deleteCardsLikes,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validations.createCard, createCard);
router.delete('/:cardId', validations.checkCardId, deleteCards);
router.put('/:cardId/likes', validations.checkCardId, putCardsLikes);
router.delete('/:cardId/likes', validations.checkCardId, deleteCardsLikes);

module.exports = router;
