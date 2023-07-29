// поключаем константы
const { STATUS_CODE } = require('../utils/constants');

class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.DATA_ERROR;
  }
}

module.exports = ErrorForbidden;
