import { Config } from './Config';

export const dev: Config = {
  env: process.env.NODE_ENV || 'development',
  isDev: true,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'rotemc',
    type: process.env.DB_TYPE || 'postgres',
    name: process.env.DB_NAME || 'xpensus_dev',
    port: process.env.DB_PORT || 5432,
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 465,
    user: process.env.EMAIL_USER || 'tetch6@gmail.com',
    password: process.env.EMAIL_TRANSPORT_PASSWORD,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  encryptSalt: process.env.ENCRYPT_SALT || 10,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  apiUrl: process.env.API_URL || 'http://localhost:3535',
};
