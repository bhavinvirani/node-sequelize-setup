// const { User } = require('../models');
const bcrypt = require('bcrypt');
const CustomErrors = require('../../errors');
const userService = require('./userService');
const tokenService = require('./tokenService');
const { tokenType } = require('../../config/constants');
const config = require('../../config/config');

const signUp = async (payload) => {
  const userExists = await userService.getByEmail(payload.email);
  if (userExists) {
    throw CustomErrors.BadRequestError('User already exists');
  }
  const user = await userService.createUser(payload);
  delete user.dataValues.password;
  return user;
};
const login = async (payload) => {
  const user = await userService.getByEmail(payload.email, true);
  if (!user) {
    throw CustomErrors.BadRequestError('Email not found');
  }
  const isMatch = await verifyPassword(payload.password, user.dataValues.password);
  if (!isMatch) {
    throw CustomErrors.BadRequestError('Invalid password');
  }
  delete user.dataValues.password;
  return user;
};

const forgotPassword = async (email) => {
  const user = await userService.getByEmail(email);
  if (!user) {
    throw CustomErrors.BadRequestError('Invalid email');
  }
  return await tokenService.generateResetPasswordToken(user);
};

const resetPassword = async (token, password) => {
  const tokenDoc = await tokenService.verifyToken(token, config.jwt.secret, tokenType.PASSWORD_RESET);
  if (!tokenDoc) {
    throw CustomErrors.UnauthorizedError('Password reset token is invalid or has expired');
  }
  const user = await userService.getById(tokenDoc.dataValues.userId);
  user.password = password;
  await user.save();
  await tokenDoc.destroy();
};

const verifyEmail = async (token) => {
  const tokenDoc = await tokenService.verifyToken(token, config.jwt.secret, tokenType.EMAIL_VERIFICATION);
  if (!tokenDoc) {
    throw CustomErrors.BadRequestError('Invalid or expired email verification token');
  }
  const user = await userService.getById(tokenDoc.dataValues.userId);
  user.isEmailVerified = true;
  await user.save();
  return user;
};

const changePassword = async (payload) => {
  const user = await userService.getById(payload.userId);
  if (!user) {
    throw CustomErrors.BadRequestError('User not found');
  }
  const isMatch = await user.comparePassword(payload.oldPassword);
  if (!isMatch) {
    throw CustomErrors.BadRequestError('Invalid credentials');
  }
  user.password = payload.newPassword;
  await user.save();
  return user;
};

const refreshAuth = async (refreshToken) => {
  const tokenDoc = await tokenService.verifyToken(refreshToken, config.jwt.refreshTokenSecret, tokenType.REFRESH);
  const user = await userService.getById(tokenDoc.dataValues.userId);
  if (!user) {
    throw CustomErrors.BadRequestError('User not found');
  }
  await tokenDoc.destroy();
  return tokenService.generateAuthTokens(user);
};

const verifyPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
  refreshAuth,
  verifyPassword,
};
