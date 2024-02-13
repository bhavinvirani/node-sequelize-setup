const CustomErrors = require('../../errors');
const { successResponse } = require('../../utils/apiResponse');
const asyncWrapper = require('../../middlewares/asyncHandler');
const {
  authService,
  tokenService,
  userService,
} = require('../services');
const { omit } = require('lodash');
const { verifyPassword } = require('../../utils/encryption');
const { statusCode } = require('../../config/constants');
const { jwtConfig } = require('../../config/config');

const omitUserFields = ['password', 'otp', 'password', 'createdAt', 'updatedAt', 'deletedAt', 'token'];

const register = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;
  const isUserExists = await userService.isUserExists(email);
  if (isUserExists) {
    throw CustomErrors.BadRequestError('User already exists');
  }
  const user = await userService.createNewUser(req.body);
  const userData = omit(user.toJSON(), omitUserFields);
  const tokens = await tokenService.generateAuthTokens(userData);
  const otp = await authService.createOTP(user);
  // todo: send otp
  return successResponse(
    res,
    statusCode.CREATED,
    { userData, tokens, temp: { otp } },
    'User Created Successfully'
  );
});

const refreshTokens = asyncWrapper(async (req, res, next) => {
  const { refreshToken } = req.body;
  const tokenDoc = await tokenService.verifyRefreshToken(refreshToken);
  const user = await userService.getById(tokenDoc.userId, ['id']);
  const tokens = await tokenService.generateAuthTokens(user);
  return successResponse(res, 200, { tokens }, 'Tokens Refreshed Successfully');
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  // todo: make change accordingly
  const user = await userService.getByEmail(email, [
    'password',
    'isVerified',
    'isActive',
    'roleId',
  ]);
  if (!user.isVerified) {
    throw CustomErrors.UnauthorizedError('User not verified');
  }
  const isPasswordMatch = await verifyPassword(password, user.password);
  if (!isPasswordMatch) {
    throw CustomErrors.UnauthorizedError('Incorrect password');
  }
  const userData = omit(user.toJSON(), omitUserFields);
  const tokens = await tokenService.generateAuthTokens(userData);
  return successResponse(
    res,
    statusCode.SUCCESS,
    { userData, tokens },
    'User Logged In Successfully'
  );
});

const logout = asyncWrapper(async (req, res, next) => {
  const { refreshToken } = req.body;
  const tokenDoc = await tokenService.verifyRefreshToken(refreshToken);
  await tokenService.deleteToken(tokenDoc.userId);
  return successResponse(res, 200, {}, 'User Logged Out Successfully');
});

const verifyUser = asyncWrapper(async (req, res, next) => {
  const { otp } = req.body;
  const { id } = req.user;
  const user = await userService.getById(id, ['otp']);
  await authService.verifyUser(user, otp);
  return successResponse(res, 200, {}, 'Email Verified Successfully');
});

const resendOTP = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const user = await userService.getById(id, ['email']);
  const otp = await authService.createOTP(user);
  // todo: send otp
  return successResponse(res, 200, { otp }, 'OTP sent to email'); 
});

const forgotPassword = asyncWrapper(async (req, res, next) => {
  const user = await userService.getByEmail(req.body.email);
  const otp = await authService.createOTP(user);
  const token = await tokenService.generateToken(user, jwtConfig.passwordResetTokenExpiration);
  await tokenService.saveToken(token, user.id);
  // todo: send otp
  return successResponse(res, 200, { otp, token }, 'Password reset token sent to email');
});

const resetPassword = asyncWrapper(async (req, res, next) => {
  const { otp, password, confirmPassword } = req.body;
  const { token } = req.query;
  if (password !== confirmPassword) {
    throw CustomErrors.BadRequestError('Passwords dose not match');
  }
  const tokenDoc = await tokenService.verifyToken(token);
  if (!tokenDoc) {
    throw CustomErrors.UnauthorizedError('Password reset token is invalid or has expired');
  }
  const user = await userService.getById(tokenDoc.userId, ['otp']);
  await authService.verifyOTP(user, otp);
  await userService.updateUserPassword(tokenDoc.userId, password);
  return successResponse(res, 200, {}, 'Password Reset Successfully');
});

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshTokens,
  verifyUser,
  resendOTP,
};
