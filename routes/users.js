/**
 * GET /users — возвращает всех пользователей
 * GET /users/:userId - возвращает пользователя по _id
 * POST /users — создаёт пользователя
 *
 * PATCH /users/me — обновляет профиль
 * PATCH /users/me/avatar — обновляет аватар
 */

const router = require('express').Router();
const validations = require('../middlewares/validations');
// импорт котроллеров
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getUserInfo
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validations.getUser, getUser);
// router.post('/', createUser);

// router.post('/signin', login);
// router.post('/signup', createUser);

router.patch('/me', validations.updateUser, updateUser);
router.patch('/me/avatar', validations.updateAvatar, updateAvatar);



module.exports = router;
