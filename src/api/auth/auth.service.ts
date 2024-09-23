import bcrypt from 'bcryptjs';
import { jwtService } from '@src/services/jwt.service';
import { userService } from '@src/api/user/user.service';
import { UserStatus } from '@src/types/User';

async function login(email: string, password: string) {
  const user = await userService.getUserBy({ email, status: UserStatus.ACTIVE });
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }
  const { password: _, ...plainUser } = user.get({ plain: true });
  const token = await jwtService.generateToken(plainUser, { expiresIn: '1d' });
  return { token };
}

export const authService = {
  login,
};