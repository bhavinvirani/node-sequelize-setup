const bcrypt = require('bcrypt');
const { jwtConfig } = require('../config/config');

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, jwtConfig.saltRound);
};

const verifyPassword = async (password, passwordHash) => {
  console.log('password', password, '\n passwordHash', passwordHash);
  return await bcrypt.compare(password, passwordHash);
};

module.exports = {
  encryptPassword,
  verifyPassword,
};
