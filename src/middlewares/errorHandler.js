const logger = require('../config/logger');
const CustomErrors = require('../errors');
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrors) {
    res.status(err.statusCode).json({
      status: false,
      message: err.message,
      data: null,
    });
  } else {
    logger.error(`Message: ${err.message} || Status: ${err.statusCode} || Stack: ${err.stack}`);
    return res.status(500).json({
      status: false,
      message: err.message || 'Internal server error',
      data: null,
    });
  }
};

module.exports = errorHandler;