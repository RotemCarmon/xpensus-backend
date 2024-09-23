import bcrypt from 'bcryptjs';
import config from '@src/config';

export function hashedPassword(password: string) {
  const saltRounds = Number(config.encryptSalt);
  return bcrypt.hash(password, saltRounds);
}


