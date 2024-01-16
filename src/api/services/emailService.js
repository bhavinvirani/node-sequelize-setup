const nodemailer = require('nodemailer');
const config = require('../../config/config');
const transporter = nodemailer.createTransport(config.email.smtp);

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transporter.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `http://localhost:8080/api/v1/reset-password?token=${token}`;
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  const emailVerificationUrl = `http://localhost:8080/api/v1/verify-email?token=${token}`;
  const text = `Dear user,
  To verify your email, click on this link: ${emailVerificationUrl}
  If you did not create an account, then ignore this email.`;

  await sendEmail(to, subject, text);
};

module.exports = {
  sendResetPasswordEmail,
  sendVerificationEmail,
};
