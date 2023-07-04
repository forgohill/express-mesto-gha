const router = require('express').Router();

// импорт котролеров
const { createUser, getUsers, getUser } = require('../controllers/user');

router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', createUser);


module.exports = router;

