import { authService } from '@src/api/auth/auth.service';
import { userService } from '@src/api/user/user.service';
import { jwtService } from '@src/services/jwt.service';
import { UserStatus } from '@src/types/User';
import bcrypt from 'bcryptjs';

vi.mock('@src/api/user/user.service');
vi.mock('@src/services/jwt.service');
vi.mock('bcryptjs');
vi.mock('@src/services/db.service');

describe('authService', () => {
  describe('login', () => {
    test('should return token', async () => {
      const email = 'example@gmail.com';
      const password = 'password';
      const user = {
        id: 1,
        email,
        password: 'hashedPassword',
        get: vi.fn(() => ({})),
      };
      const token = 'token';

      userService.getUserBy = vi.fn().mockResolvedValue(user);
      bcrypt.compare = vi.fn().mockResolvedValue(true);
      jwtService.generateToken = vi.fn().mockResolvedValue(token);

      const result = await authService.login(email, password);

      expect(result).toEqual({ token });
    });
    test('Should throw an error if the user is not found.', async () => {
      const email = 'example@gmail.com';
      const password = 'password';

      userService.getUserBy = vi.fn().mockResolvedValue(undefined);
      bcrypt.compare = vi.fn().mockResolvedValue(true);

      await expect(authService.login(email, password)).rejects.toThrow('User not found');
    });
  });

  test('Should throw an error if the password is invalid.', async () => {
    const email = 'example@gmail.com';
    const password = 'password';
    const user = { id: 1, email, password: 'hashedPassword' };

    userService.getUserBy = vi.fn().mockResolvedValue(user);
    bcrypt.compare = vi.fn().mockResolvedValue(false);

    await expect(authService.login(email, password)).rejects.toThrow('Invalid password');
  });
});
