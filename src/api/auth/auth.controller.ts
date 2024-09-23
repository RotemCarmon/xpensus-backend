import { NextFunction, Request, Response } from 'express';
import errors from '@error';
import { authService } from './auth.service';
const { UnauthorizedError } = errors;

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json(token);
  } catch (error: any) {
    next(new UnauthorizedError(error.message));
  }
}


export default {
  login,
};