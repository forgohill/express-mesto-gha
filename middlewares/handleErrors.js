// поддключаем файл с константами
const {
  STATUS_CODE,
  USER_NOT_FOUND_MESSAGE,
  CARD_NOT_FOUND_MESSAGE,
  CARD_NO_ACCESS_DELETE_MESSAGE,
  NOT_UNIQUE_EMAIL_MESSAGE,
  AUTHORISATION_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  URL_NOT_FOUND,
} = require('../utils/constants');

module.exports.handleErrors = (err, req, res, next) => {
  if (err.name === 'URL_NOT_FOUND') {
    return res.status(STATUS_CODE.NOT_FOUND).send({ message: URL_NOT_FOUND });
  }
  if (err.code === 11000) {
    return res.status(STATUS_CODE.DATA_DUBLICATE).send({ message: NOT_UNIQUE_EMAIL_MESSAGE });
  }
  if (err.message === 'AUTHORISATION_ERROR_MESSAGE') {
    return res.status(STATUS_CODE.AUTH_ERROR).send({ message: AUTHORISATION_ERROR_MESSAGE });
  }
  if (err.name === 'UNAUTHORIZED_ERROR_MESSAGE') {
    return res.status(STATUS_CODE.AUTH_ERROR).send({ message: UNAUTHORIZED_ERROR_MESSAGE });
  }
  if (err.message === 'USER_NOT_FOUND_MESSAGE') {
    return res.status(STATUS_CODE.NOT_FOUND).send({ message: USER_NOT_FOUND_MESSAGE });
  }
  if (err.message === 'CARD_NOT_FOUND_MESSAGE') {
    return res.status(STATUS_CODE.NOT_FOUND).send({ message: CARD_NOT_FOUND_MESSAGE });
  }
  if (err.message === 'CARD_NO_ACCESS_DELETE_MESSAGE') {
    return res.status(STATUS_CODE.ACCESS_IS_DENIED)
      .send({ message: CARD_NO_ACCESS_DELETE_MESSAGE });
  }
  return next();
};
