import { Request, Response, NextFunction } from 'express';
import { asyncLocalStorage } from '@src/services/als.service';
import { v4 as uuidv4 } from 'uuid';

async function attachTraceIdToALS(req: Request, res: Response, next: NextFunction) {
  const traceID = uuidv4();

  const alsStore = asyncLocalStorage.getStore();
  if (!alsStore) {
    throw new Error('AsyncLocalStorage not initialized');
  }
  alsStore.traceID = traceID;
  next();
}

export default attachTraceIdToALS;
