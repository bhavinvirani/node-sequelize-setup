const config = require('../config/config');
module.exports = {
  development: {
    username: config.postgres.username,
    password: config.postgres.password,
    database: config.postgres.db,
    host: config.postgres.host,
    port: config.postgres.port,
    dialect: config.postgres.dialect,
  },
  test: {
    // username: config.postgres.username,
    // password: config.postgres.password,
    // database: config.postgres.name,
    // host: config.postgres.host,
    // port: config.postgres.port,
    // dialect: config.postgres.dialect,
  },
  production: {
    // username: config.postgres.username,
    // password: config.postgres.password,
    // database: config.postgres.name,
    // host: config.postgres.host,
    // port: config.postgres.port,
    // dialect: config.postgres.dialect,
  },
};
