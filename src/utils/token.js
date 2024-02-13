const crypto = require('crypto');

const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateRandomToken,
};