// импорт модели user
const User = require('../models/user');

// функция создания записи user
const createUser = (req, res) => {
  console.log(req.body);

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

// функция вызова списка user
const getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

// функция вызова пользователя по ID
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

module.exports = { createUser, getUser, getUsers };
