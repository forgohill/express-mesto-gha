// поключаем константы
const { STATUS_CODE } = require('../utils/constants');

class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.NOT_FOUND;
  }
}

module.exports = ErrorNotFound;
