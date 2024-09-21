import { Sequelize, SyncOptions } from 'sequelize';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import config from '../config';
import models from '../models';
import { ModelInitFunction } from '../types/Model';
import logger from './logger.service';

const { isDev, db: _db } = config;

/* SETUP */
const certificatePath = join(__dirname, '../certs/eu-central-1-bundle.pem');
let rdsCa;

// Check if the SSL certificate file exists
if (!isDev && existsSync(certificatePath)) {
  logger.info('[ DB SERVICE ] SSL certificate found');
  rdsCa = readFileSync(certificatePath, 'utf8');
}

const connectionOptions = {
  host: _db.host,
  port: _db.port,
  dialect: _db.type,
  logging: false,
  define: {
    freezeTableName: true,
  },
  dialectOptions: {
    ssl: !isDev && {
      require: !!rdsCa,
      rejectUnauthorized: !!rdsCa, // This ensures that the certificate is checked
      ca: rdsCa ? [rdsCa] : null, // Provide the certificate here
    },
  },
};

const sequelize = new Sequelize(_db.name, _db.user, _db.password, connectionOptions);

const db: {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  [key: string]: any;
} = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};

async function connect() {
  try {
    logger.info('[ DB SERVICE ] Connecting to the database...');

    await db.sequelize.authenticate();
    logger.info('[ DB SERVICE ] Authentication successful');

    await defineModels(models as Record<string, ModelInitFunction>);
    logger.info('[ DB SERVICE ] Models defined');

    // sync
    const syncOptions: SyncOptions = {};
    if (isDev) {
      syncOptions.force = true;
    }

    await db.sequelize.sync(syncOptions);

    logger.info('[ DB SERVICE ] Database connected successfully!');

    return 'success';
  } catch (err: any) {
    logger.error(`[ DB SERVICE ] Unable to connect to the database: ${err.message}`);
    process.exit();
  }
}

async function defineModels(models: Record<string, ModelInitFunction>) {
  for (let modelName in models) {
    db[modelName] = models[modelName](sequelize);
  }
}

export default {
  db,
  connect,
  defineModels
};
