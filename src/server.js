require('dotenv').config({ path: './.env' });
const config = require('./config/config');
const { sequelize } = require('./api/models');
const logger = require('./config/logger');
const app = require('./app');

const port = config.port || 8080;
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    logger.info('DB connection has been established successfully.');
    logger.info(`Server running on port ${port}...`);
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    process.exit(1);
  }
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('SIGTERM', async () => {
  try {
    await sequelize.close();
    logger.info('SIGTERM received. Server shutting down gracefully.');
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
});
