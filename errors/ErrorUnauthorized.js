// поключаем_константы
const { STATUS_CODE } = require('../utils/constants');

class ErrorUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.AUTH_ERROR;
  }
}

module.exports = ErrorUnauthorized;
