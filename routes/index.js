const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const validations = require('../middlewares/validations');
const auth = require('../middlewares/auth');

router.post('/signin', validations.login, login);
router.post('/signup', validations.createUser, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
