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
  SALT_ROUND: Joi.number().required().description('Salt round for hashing'),
  JWT_EXPIRATION: Joi.string().required().description('JWT expiration time'),
  ACCESS_TOKEN_EXPIRATION: Joi.string().required().description('Access token expiration time'),
  REFRESH_TOKEN_EXPIRATION: Joi.string().required().description('Refresh token expiration time'),
  PASSWORD_TOKEN_EXPIRATION: Joi.string().required().description('Password reset token expiration time'),

  // Mail
  SMTP_HOST: Joi.string().description('server that will send the emails'),
  SMTP_PORT: Joi.number().description('port to connect to the email server'),
  SMTP_USERNAME: Joi.string().description('username for email server'),
  SMTP_PASSWORD: Joi.string().description('password for email server'),
  SMTP_EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  // Cloudinary
  CLOUDINARY_CLOUD_NAME: Joi.string().description('Cloudinary cloud name'),
  CLOUDINARY_API_KEY: Joi.string().description('Cloudinary API key'),
  CLOUDINARY_API_SECRET: Joi.string().description('Cloudinary API secret'),

  // OTP
  OTP_SECRET: Joi.string().required().description('OTP secret key'),
  OTP_EXPIRY_MINUTES: Joi.number().required().description('OTP expiration time'),
  OTP_LENGTH: Joi.number().required().description('OTP length'),
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
  SALT_ROUND,
  JWT_EXPIRATION,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  PASSWORD_TOKEN_EXPIRATION,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_EMAIL_FROM,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  OTP_EXPIRY_MINUTES,
  OTP_LENGTH,
  OTP_SECRET,
} = envVars;

const envConfig = {
  env: NODE_ENV,
  port: PORT,
  corsOrigin: CORS_ORIGIN,
};

const databaseConfig = {
  host: DB_HOST,
  port: DB_PORT,
  password: DB_PASSWORD,
  db: DB_NAME,
  username: DB_USERNAME,
  dialect: DB_DIALECT,
};

const jwtConfig = {
  secret: JWT_SECRET,
  saltRound: SALT_ROUND,
  expiration: JWT_EXPIRATION,
  accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
  refreshTokenExpiration: REFRESH_TOKEN_EXPIRATION,
  passwordResetTokenExpiration: PASSWORD_TOKEN_EXPIRATION,
};

const emailConfig = {
  smtp: {
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  },
  from: SMTP_EMAIL_FROM,
};

const cloudinaryConfig = {
  cloudName: CLOUDINARY_CLOUD_NAME,
  apiKey: CLOUDINARY_API_KEY,
  apiSecret: CLOUDINARY_API_SECRET,
};

const otpConfig = {
  otpSecret: OTP_SECRET,
  otpExpiry: OTP_EXPIRY_MINUTES,
  otpLength: OTP_LENGTH,
};

module.exports = {
  envConfig,
  databaseConfig,
  jwtConfig,
  emailConfig,
  cloudinaryConfig,
  otpConfig,
};
