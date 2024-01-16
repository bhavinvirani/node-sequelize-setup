const { successResponse } = require('../../utils/apiResponse');
const asyncWrapper = require('../../middlewares/asyncHandler');
const { authService, tokenService, emailService } = require('../services');

const signUp = asyncWrapper(async (req, res, next) => {
  const user = await authService.signUp(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  return successResponse(res, 201, { user, tokens }, 'User Created Successfully');
});

const login = asyncWrapper(async (req, res, next) => {
  const user = await authService.login(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  return successResponse(res, 200, { user, tokens }, 'User Logged In Successfully');
});

const logout = asyncWrapper(async (req, res, next) => {
  await authService.logout(req.body.refreshToken);
  return successResponse(res, 200, {}, 'User Logged Out Successfully');
});

const refreshTokens = asyncWrapper(async (req, res, next) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  return successResponse(res, 200, tokens, 'Tokens Refreshed Successfully');
});

const forgotPassword = asyncWrapper(async (req, res, next) => {
  const token = await authService.forgotPassword(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, token);
  return successResponse(res, 200, { token }, 'Password reset token sent to email');
});

const resetPassword = asyncWrapper(async (req, res, next) => {
  await authService.resetPassword(req.query.token, req.body.password);
  return successResponse(res, 200, {}, 'Password Reset Successfully');
});

const sendVerificationEmail = asyncWrapper(async (req, res, next) => {
  const emailVerificationToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, emailVerificationToken);
  return successResponse(
    res,
    200,
    { token: emailVerificationToken },
    'Verification email sent to your registered email'
  );
});

const verifyEmail = asyncWrapper(async (req, res, next) => {
  await authService.verifyEmail(req.query.token);
  return successResponse(res, 200, {}, 'Email Verified Successfully');
});

module.exports = {
  signUp,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshTokens,
  sendVerificationEmail,
  verifyEmail,
};
