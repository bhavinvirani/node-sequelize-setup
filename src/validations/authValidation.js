const joi = require('joi');
const password = require('./custom/password');

const register = {
  body: joi.object().keys({
    name: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().custom(password),
  }),
};

const login = {
  body: joi.object().keys({
    email: joi.string().required().email(),
    password: joi.string().required().custom(password),
  }),
};

const logout = {
  body: joi.object().keys({
    refreshToken: joi.string().required(),
  }),
};

const refreshTokens = {
  body: joi.object().keys({
    refreshToken: joi.string().required(),
  }),
};

const forgotPassword = {
  body: joi.object().keys({
    email: joi.string().required().email(),
  }),
};

const resetPassword = {
  body: joi.object().keys({
    password: joi.string().required().custom(password),
  }),
  query: joi.object().keys({
    token: joi.string().required(),
  }),
};


const verifyEmail = {
  query: joi.object().keys({
    token: joi.string().required(),
  }),
};
module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshTokens,
  verifyEmail,
};
