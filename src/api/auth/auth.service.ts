import bcrypt from 'bcryptjs';
import { jwtService } from '@src/services/jwt.service';
import { userService } from '@src/api/user/user.service';

async function login(email: string, password: string) {
  const user = await userService.getUserBy({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = await jwtService.generateToken({ id: user.id });
  return { token };
}

// async function signup(email: string, password: string) {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await userService.createUser({ email, password: hashedPassword });
//   return user;
// }


export const authService = {
  login,
};