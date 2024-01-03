const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const endpointNotFound = require('./middlewares/endpointNotFound');
const config = require('./config/config');
const { environment } = require('./config/constants');

const app = express();

if (config.env === environment.DEVELOPMENT) {
  app.use(morgan('dev'));
}
app.use(helmet());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'X-Requested-With',
      'Accept',
      'x-access-token',
    ],
    preflightContinue: false,
  })
);

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', require('./routes'));

app.use('*', errorHandler);
app.use(endpointNotFound);

module.exports = app;
