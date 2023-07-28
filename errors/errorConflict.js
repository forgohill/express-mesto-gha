const { STATUS_CODE } = require('../utils/constants');

class errorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.DATA_DUBLICATE;
  }
};

module.exports = errorConflict;
