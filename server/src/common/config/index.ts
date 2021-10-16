import dotenv from 'dotenv';

const isEnvFound = dotenv.config();
if (isEnvFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT),

  //  Used by winston logger
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  hostname: 'localhost',

  api: {
    url: 'http://localhost:5000',
    clientUrl: 'https://dmitripavlutin.com',
    prefix: '/api',
  },

  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },

  token: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpirationInSeconds: parseInt(process.env.JWT_ACCESS_EXPIRATION_TIME),
    refreshExpirationInSeconds: parseInt(
      process.env.JWT_REFRESH_EXPIRATION_TIME
    ),
  },

  OAuth2: {
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    redirectUrl: process.env.OAUTH_REDIRECT_URL,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    user: process.env.SMTP_USER,
  },

  session: {
    secretKey: process.env.SESSION_SECRET,
    expirationDays: +process.env.SESSION_COOKIE_EXPIRATION_DAYS,
  },
};
