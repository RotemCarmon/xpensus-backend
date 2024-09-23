import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import http from 'http';
import setupAsyncLocalStorage from './middlewares/setupAls.middleware';
import attachTraceIdToALS from './middlewares/traceId.middleware';
import expressWinston from './middlewares/express-winston.middleware';
import logger from './services/logger.service';
import dbService from './services/db.service';
import redisService from './services/redis.service';

const app: Express = express();
const httpServer = http.createServer(app);

dbService.connect();

// Redis server initialization
(async () => {
  await redisService.init()
})()

// MIDDLEWARES
app.use(express.json());
app.use(
  express.raw({
    type: 'application/pdf',
    limit: '10mb',
  })
);
app.use(setupAsyncLocalStorage);
app.use(attachTraceIdToALS);
app.use(expressWinston);

// CORS
const corsOptions: CorsOptions = {
  origin: [/^https?:\/\/localhost(:[0-9]+)?$/],
  credentials: true,
};
app.use(cors(corsOptions));

// ROUTES
import authRoutes from './api/auth/auth.routes';
import groupRoutes from './api/group/group.routes';
import groupInvitationRoutes from './api/group-invitation/groupInvitation.routes';

app.use('/api/auth', authRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/group-invitation', groupInvitationRoutes);

// HEALTH CHECK
app.get('/health', (req: Request, res: Response) => {
  res.send('Successfully connected to the server!!!!');
});

// DEFAULT ERROR HANDLER
import errorHandler from './middlewares/error-handler.middleware';
app.use(errorHandler);

export default httpServer;
