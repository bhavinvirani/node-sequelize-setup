const express = require('express');
const router = express.Router();
const config = require('../config/config');

const defaultRoutes = [
  {
    path: '/auth',
    route: require('./auth.routes'),
  },
  {
    path: '/users',
    route: require('./user.routes'),
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if(config.env === 'development') {
  router.use('/test-server', (req, res, next) => {
    res.status(200).json({
      message: 'Server is Alive :)',
    });
  });
}

module.exports = router;
