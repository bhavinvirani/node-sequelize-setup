// const { authenticator } = require('otplib');
// const { otpConfig } = require('../config/config');

const { otpConfig } = require("../config/config");

// const expireOTPInSeconds = 60 * parseInt(otpConfig.otpExpiry);
// authenticator.options = {
//   digits: otpConfig.otpLength,
//   step: expireOTPInSeconds,
// };

// const generateOTP = () => {
//   const secret = authenticator.generateSecret();
//   const otp = authenticator.generate(secret);
//   return { otp, secret };
// };

// const verifyOTP = (otp, secret) => {
//   return authenticator.verify({ secret: secret, token: otp });
// };

// module.exports = {
//   generateOTP,
//   verifyOTP,
// };

const generateOTP = () => {
  const digits = otpConfig.otpLength;
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  generateOTP,
};
