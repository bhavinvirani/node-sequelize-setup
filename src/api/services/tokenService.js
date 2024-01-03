const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../config/config');
const { tokenType } = require('../../config/constants');
const { Token } = require('../models');
const CustomError = require('../../errors');

const generateToken = async (
  user,
  type,
  expires,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: user.id,
    ...(user.email && { email: user.email }),
    ...(user.username && { username: user.username }),
    type,
    iat: moment().unix(),
    exp: expires.unix(),
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessTokenExpirationMinutes,
    'minutes'
  );
  const refreshTokenExpires = moment().add(
    config.jwt.refreshTokenExpirationDays,
    'days'
  );
  const accessToken = await generateToken(
    user,
    tokenType.ACCESS,
    accessTokenExpires,
    config.jwt.accessTokenSecret
  );
  const refreshToken = await generateToken(
    user,
    tokenType.REFRESH,
    accessTokenExpires,
    config.jwt.refreshTokenSecret
  );
  await saveToken(
    refreshToken,
    user.id,
    tokenType.REFRESH,
    refreshTokenExpires
  );
  return { accessToken, refreshToken };
};

const generateResetPasswordToken = async (user) => {
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes'
  );
  const resetPasswordToken = await generateToken(
    user,
    tokenType.PASSWORD_RESET,
    expires
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    tokenType.PASSWORD_RESET,
    expires
  );
  return resetPasswordToken;
};

const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    'minutes'
  );
  const verifyEmailToken = await generateToken(
    user,
    tokenType.EMAIL_VERIFICATION,
    expires
  );
  await saveToken(
    verifyEmailToken,
    user.id,
    tokenType.EMAIL_VERIFICATION,
    expires
  );
  return verifyEmailToken;
};

//? verify refresh, email verification and password reset tokens
const verifyToken = async (token, secret, type) => {
  try {
    const payload = jwt.verify(token, secret);
    const tokenDoc = await Token.findOne({
      where: {
        token,
        userId: payload.sub,
        type,
      },
    });
    if (!tokenDoc) {
      throw CustomError.UnauthorizedError('Invalid token');
    }
    return tokenDoc;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.isExpired = true;
      throw CustomError.UnauthorizedError('Token expired');
    }
    throw CustomError.UnauthorizedError('Invalid token');
  }
};

const saveToken = async (token, userId, type, expires) => {
  const tokenExists = await Token.findOne({ where: { userId, type } });
  if (tokenExists) {
    await tokenExists.destroy();
  }
  const newToken = await Token.create({
    token,
    userId,
    type,
    expires: expires.toDate(),
  });
  return newToken;
};

module.exports = {
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
  verifyToken,
};
