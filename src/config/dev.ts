import { Config } from './Config';

export const dev: Config = {
  env: process.env.NODE_ENV || 'development',
  isDev: true,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'rotemc',
    type: process.env.DB_TYPE || 'postgres',
    name: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
  },

  encryptSalt: process.env.ENCRYPT_SALT || 10,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
};
