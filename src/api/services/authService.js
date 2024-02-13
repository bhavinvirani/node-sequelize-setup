const bcrypt = require('bcrypt');
const CustomErrors = require('../../errors');
const userService = require('./userService');
const tokenService = require('./tokenService');
const { generateOTP } = require('../../utils/otp');

const resetPassword = async (token, password) => {
  const tokenDoc = await tokenService.verifyToken(token);
  if (!tokenDoc) {
    throw CustomErrors.UnauthorizedError(
      'Password reset token is invalid or has expired'
    );
  }
  const user = await userService.getById(tokenDoc.dataValues.userId);
  user.password = password;
  await user.save();
  await tokenDoc.destroy();
};

const verifyUser = async (user, otp) => {
  if (user.otp != otp) {
    throw CustomErrors.BadRequestError('Invalid OTP');
  }
  user.isVerified = true;
  user.isActive = true;
  user.otp = null;
  await user.save();
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

const verifyPassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

// otp
const createOTP = async (user) => {
  const otp = generateOTP();
  user.otp = otp;
  await user.save();
  return otp;
};

const verifyOTP = async (user, otp) => {
  if (user.otp != otp) {
    throw CustomErrors.BadRequestError('Invalid OTP');
  }
  user.otp = null;
  await user.save();
  return true;
};

module.exports = {
  resetPassword,
  verifyUser,
  changePassword,
  verifyPassword,
  createOTP,
  verifyOTP,
};
