import { jwtService } from '@src/services/jwt.service';
import errors from '../models/errors';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from '@src/types/ExpressRequest';
import redisService from '@src/services/redis.service';

const { UnauthorizedError } = errors;

export default async function requireAuthToken(req: ExpressRequest, res: Response, next: NextFunction) {
  const fullToken = req.headers['authorization'];
  if (!fullToken) {
    return next(new UnauthorizedError('[ REQUIRE AUTH TOKEN ] No token provided'));
  }

  try {
    const token = fullToken.split(' ')[1];
    const blackListedToken = await redisService.getTokenFromBlackList(token)
    if (blackListedToken) {
      return next(new UnauthorizedError('[ REQUIRE AUTH TOKEN ] User is not authorized please login'));
    }
    const decoded = await jwtService.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new UnauthorizedError('[ REQUIRE AUTH TOKEN ] User is not authorized please login'));
  }
}
