import Logger from '@srcPath/common/loaders/logger.loader';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/api.error';

const appErrorMiddleware = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Logger.error(err.message);
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      status: err.status,
      name: err.name,
      message: err.message,
      errors: err.errors,
    });
  }

  // Errors not processed by ApiError class
  return res.status(500).json({ status: 500, message: err.message });
};

export default appErrorMiddleware;
