import config from '../config';
import jwt from 'jsonwebtoken';

async function generateToken(payload: any, options?: jwt.SignOptions) {
  return jwt.sign(payload, config.accessTokenSecret, options);
}

async function verifyToken(token: string) {
  return jwt.verify(token, config.accessTokenSecret);
}

export const jwtService = {
  generateToken,
  verifyToken,
};
