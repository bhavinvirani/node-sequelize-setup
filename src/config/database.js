const { databaseConfig } = require('./config');
module.exports = {
  development: {
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.db,
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect,
  },
  test: {
    // username: databaseConfig.username,
    // password: databaseConfig.password,
    // database: databaseConfig.name,
    // host: databaseConfig.host,
    // port: databaseConfig.port,
    // dialect: databaseConfig.dialect,
  },
  production: {
    // username: databaseConfig.username,
    // password: databaseConfig.password,
    // database: databaseConfig.name,
    // host: databaseConfig.host,
    // port: databaseConfig.port,
    // dialect: databaseConfig.dialect,
  },
};
