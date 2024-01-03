const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object({
  PORT: Joi.number().default(3000),
  CORS_ORIGIN: Joi.string().required().description('CORS origin url'),

  // Database (Postgres)
  DB_HOST: Joi.string().required().description('database host'),
  DB_PORT: Joi.number().default(5432),
  DB_PASSWORD: Joi.string().required().description('database password'),
  DB_NAME: Joi.string().required().description('database name'),
  DB_USERNAME: Joi.string().required().description('database user'),
  DB_DIALECT: Joi.string().required().description('database dialect'),

  // JWT
  JWT_SECRET: Joi.string().required().description('JWT secret key'),
  JWT_EXPIRATION: Joi.string().required().description('JWT expiration time'),
  ACCESS_TOKEN_SECRET: Joi.string().required().description('Access token secret key'),
  ACCESS_TOKEN_EXPIRATION_MINUTES: Joi.number().required().description('Access token expiration time'),
  REFRESH_TOKEN_SECRET: Joi.string().required().description('Refresh token secret key'),
  REFRESH_TOKEN_EXPIRATION_DAYS: Joi.number().required().description('Refresh token expiration time'),
  RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES: Joi.number().required().description('Reset password token expiration time'),
  VERIFY_EMAIL_TOKEN_EXPIRATION_MINUTES: Joi.number().required().description('Verify email token expiration time'),

  // Mail
  SMTP_HOST: Joi.string().description('server that will send the emails'),
  SMTP_PORT: Joi.number().description('port to connect to the email server'),
  SMTP_USERNAME: Joi.string().description('username for email server'),
  SMTP_PASSWORD: Joi.string().description('password for email server'),
  SMTP_EMAIL_FROM: Joi.string().description(
    'the from field in the emails sent by the app'
  ),
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: Joi.string().description('Cloudinary cloud name'),
  CLOUDINARY_API_KEY: Joi.string().description('Cloudinary API key'),
  CLOUDINARY_API_SECRET: Joi.string().description('Cloudinary API secret'),
})
  .prefs({ errors: { label: 'key' } })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  console.warn(`Warning: Invalid environment variables - ${error.message}`);
  process.exit(1);
}

const {
  NODE_ENV,
  PORT,
  CORS_ORIGIN,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_NAME,
  DB_USERNAME,
  DB_DIALECT,
  JWT_SECRET,
  JWT_EXPIRATION,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION_MINUTES,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION_DAYS,
  RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES,
  VERIFY_EMAIL_TOKEN_EXPIRATION_MINUTES,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_EMAIL_FROM,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = envVars;

module.exports = {
  env: NODE_ENV,
  port: PORT,
  corsOrigin: CORS_ORIGIN,
  postgres: {
    host: DB_HOST,
    port: DB_PORT,
    password: DB_PASSWORD,
    db: DB_NAME,
    username: DB_USERNAME,
    dialect: DB_DIALECT,
  },
  jwt: {
    secret: JWT_SECRET,
    expiration: JWT_EXPIRATION,
    accessTokenSecret: ACCESS_TOKEN_SECRET,
    accessTokenExpirationMinutes: ACCESS_TOKEN_EXPIRATION_MINUTES,
    refreshTokenSecret: REFRESH_TOKEN_SECRET,
    refreshTokenExpirationDays: REFRESH_TOKEN_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: RESET_PASSWORD_TOKEN_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: VERIFY_EMAIL_TOKEN_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    },
    from: SMTP_EMAIL_FROM,
  },
  cloudinary: {
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
  },
};
