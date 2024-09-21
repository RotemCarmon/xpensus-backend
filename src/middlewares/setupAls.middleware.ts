import { Request, Response, NextFunction } from 'express';
import { asyncLocalStorage } from '../services/als.service';

async function setupAsyncLocalStorage(req: Request, res: Response, next: NextFunction) {
  const storage = {};
  asyncLocalStorage.run(storage, () => {
    // Set the session ID and user in the AsyncLocalStorage store
    // TODO: set the user session id or the JWT depends on the auth method
   
    // if (req.sessionID) {
    //   const alsStore = asyncLocalStorage.getStore();
    //   alsStore.sessionId = req.sessionID;
    //   if (req.session.user) {
    //     alsStore.user = req.session.user;
    //   }
    // }
    next();
  });
}


export default setupAsyncLocalStorage;