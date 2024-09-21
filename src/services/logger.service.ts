import { existsSync, mkdirSync, readFile } from 'fs';
import { createLogger, format, transports } from 'winston';
import { Store, asyncLocalStorage } from './als.service';
import config from '../config';

const { env } = config;
const { printf } = format;

// const rotateTransport = require('./rotateLogger.service');

const logsdir = './logs';
if (!existsSync(logsdir)) {
  mkdirSync(logsdir);
}

//define the time format
const timeFormatFn = () => {
  let now = new Date();
  return now.toUTCString();
};

function getTraceId() {
  const store = asyncLocalStorage.getStore() as Store;
  return store && store.traceID ? `[TraceID: ${store.traceID}] ` : '';
}

const defaultFormat = printf((info) => {
  const statusCode = info.meta?.res.statusCode ? ` - ${info.meta?.res.statusCode}` : '';
  info.env = env;
  return `[${timeFormatFn()}] ${info.level.toUpperCase()} - ${info.message}${statusCode}`;
});

const stringFormat = printf((info) => {
  const traceID = getTraceId();
  const { level, message } = info;
  const statusCode = info.meta?.res.statusCode ? ` - ${info.meta?.res.statusCode}` : '';
  return `[${timeFormatFn()}] ${traceID}${level.toUpperCase()} - ${message}${statusCode}`;
});

const logger = createLogger({
  level: 'info',
  format: defaultFormat,
  defaultMeta: {
    service: 'api',
  },
  transports: [
    new transports.File({ filename: 'logs/log.log' }),
    new transports.Console({
      format: stringFormat,
      level: 'debug',
    }),
  ],
});

async function getLogs(tail = 10000) {
  return new Promise((resolve, reject) => {
    readFile('logs/log.log', 'utf-8', (err, data) => {
      if (err) {
        if (typeof err === 'string') {
          logger.log('error', err, true);
        }
        reject(err);
      }
      return resolve(data.split('\r\n').filter(Boolean).slice(-tail).join('\r\n'));
    });
  });
}

export default {
  debug: (message: string) => {
    logger.log('debug', message, true);
  },

  info: (message: string) => {
    logger.log('info', message, true);
  },

  warn: (message: string) => {
    logger.log('warn', message, true);
  },

  error: (message: string) => {
    logger.log('error', message, true);
  },
  defaultFormat,
  stringFormat,
  getLogs,
};
