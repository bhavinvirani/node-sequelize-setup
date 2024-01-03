const express = require('express');
const router = express.Router();
const { authController } = require('../api/controllers');

const validate = require('../middlewares/validate');
const authValidation = require('../validations/authValidation');
const { verifyToken } = require('../middlewares/auth');

router.post(
  '/register',
  validate(authValidation.register),
  authController.signUp
);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post(
  '/refresh-tokens',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post(
  '/forgot-password',
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  '/reset-password',
  validate(authValidation.resetPassword),
  authController.resetPassword
);
router.post(
  '/send-verification-email',
  verifyToken,
  authController.sendVerificationEmail
);
router.get(
  '/verify-email',
  validate(authValidation.verifyEmail),
  authController.verifyEmail
);

module.exports = router;
