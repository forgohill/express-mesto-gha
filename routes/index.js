const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// router.all('*', (req, res, next) => next(new NotFoundError('Неверный URL запроса')));
module.exports = router;
