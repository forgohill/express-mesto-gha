// поддключаем файл с константами
const { STATUS_CODE, ERROR_SERVER_MESSAGE } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(STATUS_CODE.SERVER_ERROR).send({ message: ERROR_SERVER_MESSAGE });
  }
  res.status(err.statusCode).send({ message: err.message });
  return next();
};
