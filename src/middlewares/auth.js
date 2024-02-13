const jwt = require('jsonwebtoken');
const CustomError = require('../errors');
const { userService } = require('../api/services');
const { jwtConfig } = require('../config/config');
const logger = require('../config/logger');

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    return res.status(403).send({
      status: false,
      message: 'No token provided',
      data: null,
    });
  }
  try {
    const accessTokenDoc = jwt.verify(accessToken, jwtConfig.secret);
    const user = await userService.getById(accessTokenDoc.sub);
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.isTokenAccessTokenExpired = true;
      return res.status(403).send({
        status: false,
        message: 'Access token has expired',
        data: null,
        isExpired: true,
        // isAccessTokenExpired: true,
      });
    }
    logger.error(
      `Message: ${error.message} || Status: ${error.statusCode} || Stack: ${error.stack}`
    );
    return res.status(403).send({
      status: false,
      message: 'Authentication failed || internal server error',
      data: null,
    });
  }
};

// const verifyRole = (roles) => (req, res, next) => {
//   if (!roles.includes(req.user.role)) {
//     throw CustomError.UnauthorizedError('Unauthorized');
//   }
//   next();
// };

module.exports = {
  verifyToken,
  // verifyRole,
};
