const { STATUS_CODE } = require('../utils/constants');

class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.ACCESS_IS_DENIED;
  }
}

module.exports = ErrorForbidden;
