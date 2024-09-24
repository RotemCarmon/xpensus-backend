import { Sequelize, SyncOptions } from 'sequelize';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import config from '../config';
import { initModels } from '../models';
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

async function connect() {
  try {
    logger.info('[ DB SERVICE ] Connecting to the database...');

    await sequelize.authenticate();
    logger.info('[ DB SERVICE ] Authentication successful');

    initModels(sequelize);
    logger.info('[ DB SERVICE ] Models initialized');

    // sync
    const syncOptions: SyncOptions = {};
    if (isDev) {
      // syncOptions.force = true;
    }

    await sequelize.sync(syncOptions);

    logger.info('[ DB SERVICE ] Database connected successfully!');

    return 'success';
  } catch (err: any) {
    logger.error(`[ DB SERVICE ] Unable to connect to the database: ${err.message}`);
    process.exit();
  }
}

export default {
  sequelize,
  connect,
};
