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
    prefix: '/api',
  },

  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
};
