const { jwtConfig } = require('../../config/config');
const { RefreshToken, User } = require('../models');
const CustomError = require('../../errors');
const { signJwt, verifyJwt } = require('../../utils/jwt');

const generateToken = async (user, expires) => {
  const payload = {
    sub: user.id,
    userId: user.id,
    // ...(user.email && { email: user.email }),
    // ...(user.role && { role: user.role }),
  };
  return signJwt(payload, { expiresIn: expires });
};

const generateAuthTokens = async (user) => {
  const accessToken = await generateToken(user, jwtConfig.accessTokenExpiration);
  const refreshToken = await generateToken(user, jwtConfig.refreshTokenExpiration);
  await saveRefreshToken(refreshToken, user.id);
  return { accessToken, refreshToken };
};

const verifyToken = async (token) => {
  return verifyJwt(token);
  
};

const verifyRefreshToken = async (refreshToken) => {
  const payload = verifyJwt(refreshToken);
  const tokenDoc = await RefreshToken.findOne({
    where: {
      userId: payload.userId,
      token: refreshToken,
    },
  });
  if (!tokenDoc) {
    throw CustomError.UnauthorizedError('Invalid refresh token');
  }
  return tokenDoc;
};

const saveRefreshToken = async (token, userId) => {
  if (await isTokenExist(userId)) {
    await deleteToken(userId);
  }
  await RefreshToken.create({
    token,
    userId,
  });
};

const saveToken = async (token, userId) => {
  await User.update(
    { token },
    {
      where: { id: userId },
    }
  );
};

const isTokenExist = async (userId) => {
  const count = await RefreshToken.count({
    where: { userId },
  });
  return count > 0;
};

const deleteToken = async (userId) => {
  await RefreshToken.destroy({ where: { userId } });
};

module.exports = {
  generateToken,
  generateAuthTokens,
  verifyRefreshToken,
  isTokenExist,
  deleteToken,
  saveToken,
  verifyToken,
};
