const { STATUS_CODE } = require('../utils/constants');

class errorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.NOT_FOUND;
  }
}

module.exports = errorNotFound;
