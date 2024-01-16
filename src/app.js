const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const endpointNotFound = require('./middlewares/endpointNotFound');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { environment } = require('./config/constants');

const app = express();

// Log the request
if (config.env === environment.DEVELOPMENT || config.env === environment.TEST) {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss())

// enable cors
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept', 'x-access-token'],
    preflightContinue: false,
  })
);

// Serve static files
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/v1', require('./routes'));

app.use('*', errorHandler);
app.use(endpointNotFound);

module.exports = app;
