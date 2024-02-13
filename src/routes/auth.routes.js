const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const authValidation = require('../validations/authValidation');
const { authController } = require('../api/controllers');
const { verifyToken } = require('../middlewares/auth');

router.post('/register', validate(authValidation.register), authController.register);
router.post(
  '/verify-user',
  [validate(authValidation.verifyUser), verifyToken],
  authController.verifyUser
);
router.post(
  '/refresh-tokens',
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/resend-otp', verifyToken, verifyToken, authController.resendOTP);
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

module.exports = router;
