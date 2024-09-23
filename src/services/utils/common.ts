import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import config from '@src/config';

export function hashedPassword(password: string) {
  const saltRounds = Number(config.encryptSalt);
  return bcrypt.hash(password, saltRounds);
}

export function generateUniqueToken(): string {
  const randomPart = randomBytes(16).toString('hex');
  const timestamp = Date.now().toString(36);
  return `${randomPart}-${timestamp}`;
}

export function validateEmail(email: string): boolean {  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  return regex.test(email);}