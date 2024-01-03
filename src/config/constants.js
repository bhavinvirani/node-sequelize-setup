const environment = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
};

const tokenType = {
  JWT: 'jwt',
  ACCESS: 'access',
  REFRESH: 'refresh',
  EMAIL_VERIFICATION: 'emailVerification',
  PASSWORD_RESET: 'passwordReset',
};

const statusCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  environment,
  tokenType,
  statusCode,
};

// const environment = {
//     development: {
//         prefix: 'dev',
//         isProduction: false,
//         apiHost: 'http://localhost:3000',
//         apiPort: process.env.PORT || 3000
//     },
//     production: {
//         prefix: 'prod',
//         isProduction: true,
//         apiHost: 'http://localhost:3000',
//         apiPort: process.env.PORT || 3000
//     },
//     test: {
//         prefix: 'test',
//         isProduction: false,
//         apiHost: 'http://localhost:3000',
//         apiPort: process.env.PORT || 3000
//     }
// }[process.env.NODE_ENV || 'development'];
