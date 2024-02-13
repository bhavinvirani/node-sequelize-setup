const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config/config');

const signJwt = (payload, options) => {
  return jwt.sign(payload, jwtConfig.secret, options);
};

const verifyJwt = (token) => {
  return jwt.verify(token, jwtConfig.secret);
};

module.exports = {
  signJwt,
  verifyJwt,
};
