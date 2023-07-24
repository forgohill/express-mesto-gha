/**
 * GET /users — возвращает всех пользователей
 * GET /users/:userId - возвращает пользователя по _id
 * POST /users — создаёт пользователя
 *
 * PATCH /users/me — обновляет профиль
 * PATCH /users/me/avatar — обновляет аватар
 */

const router = require('express').Router();

// импорт котроллеров
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  login
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
// router.post('/', createUser);

router.post('/signin', login);
router.post('/signup', createUser);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);



module.exports = router;
