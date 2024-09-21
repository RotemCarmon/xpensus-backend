import { NextFunction, Response, Request } from 'express';
import errors from '../models/errors';
const { InternalError } = errors;
import logger from '../services/logger.service';

/**
 * @description This is the last middleware in the aplication, it catches the errors and handle them;
 */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = err;
  // if (typeof err === 'object' && err.type === 'system')  skip

  // default to 500 server error
  if (typeof err === 'string') {
    error = new InternalError(err);
  } else if (err.type !== 'system') {
    error = new InternalError(err.message || err.stack);
  }

  logger.error(`[ERROR-HANDLER] [${error.code}] [${error.name}] - ${error.message}`);
  res.status(error.code).json({ name: error.name, errors: error.serialize(), code: error.code });
};

export default errorHandler;
