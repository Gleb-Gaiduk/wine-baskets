import winston from 'winston';
import config from '../config';

const transports = [];

if (process.env.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      ),
    })
  );
} else {
  transports.push(new winston.transports.Console());
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
});

export const logErrorWithFilePath = <T extends Error>(
  errorObject: T
): winston.Logger =>
  LoggerInstance.error(`${__filename}: ${errorObject.message}`);

export default LoggerInstance;
