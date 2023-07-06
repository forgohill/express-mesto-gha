/**
 * GET /cards — возвращает все карточки
 * POST /cards — создаёт карточку
 * DELETE /cards/:cardId — удаляет карточку по идентификатору
 *
 * PUT /cards/:cardId/likes — поставить лайк карточке
 * DELETE /cards/:cardId/likes — убрать лайк с карточки
 */

const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCards,
  putCardsLikes,
  deleteCardsLikes,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCards);
router.put('/:cardId/likes', putCardsLikes);
router.delete('/:cardId/likes', deleteCardsLikes);

module.exports = router;
