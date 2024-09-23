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

  encryptSalt: process.env.ENCRYPT_SALT,
};
