const Card = require('../models/card');

const createCard = (req, res) => {
  // const { owner } = req.user._id;
  // console.log(req.user._id);
  // console.log(req.body);
  // console.log(owner);
  // console.log({ owner });

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

module.exports = { createCard };