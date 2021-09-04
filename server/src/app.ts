require('module-alias/register');
import config from '@srcPath/common/config';
import express, { Application } from 'express';
import Logger from './common/loaders/logger.loader';

async function startServer() {
  const app: Application = express();

  // Initiate loaders
  await require('@srcPath/common/loaders').default({ expressApp: app });

  app
    .listen(config.port, config.hostname, () => {
      Logger.info(`
    ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
      ############################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
