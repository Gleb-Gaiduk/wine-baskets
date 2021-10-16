// The idea of loaders is that you split the startup process of your node.js service into testable modules.
import expressLoader from './express.loader';
import Logger from './logger.loader';

export default async ({ expressApp }) => {
  await expressLoader(expressApp);
  Logger.info('✌️ Express loaded');
};
