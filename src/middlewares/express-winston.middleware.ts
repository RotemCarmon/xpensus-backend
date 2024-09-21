import winston from 'winston';
import expressWinston from 'express-winston';
import loggerService from '../services/logger.service';
import config from '../config';

const { defaultFormat, stringFormat } = loggerService;

// read more about the full properties here https://www.npmjs.com/package/express-winston
const transports = [new winston.transports.File({ filename: 'logs/log.log' }), new winston.transports.Console({ format: stringFormat })];
const logger = expressWinston.logger({
  transports,
  format: defaultFormat,
  meta: true, // (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: false,
});

// req.body is by default not included because it will often contain things that shouldn't
// be logged like passwords, so be sure you want to do it before you do.
expressWinston.requestWhitelist.push('body');

export default logger;
