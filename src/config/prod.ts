import { Config } from './Config';

export const prod: Config = {
  env: process.env.NODE_ENV || 'production',
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    type: process.env.DB_TYPE,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_TRANSPORT_PASSWORD,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  encryptSalt: process.env.ENCRYPT_SALT,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
};
