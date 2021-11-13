import ApiError from '@srcPath/common/errors/api.error';
import tokenService from '@srcPath/domains/token/services/token.service';
import { NextFunction, Request, Response } from 'express';
import { TAccessRole } from './roles.interface';

const checkRole =
  (roles: Array<TAccessRole>) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) next(ApiError.UnauthorizedError());

      const accessToken: string = authorizationHeader.split(' ')[1];
      if (!accessToken) next(ApiError.UnauthorizedError());

      const { accessRole } = tokenService.validateAccessToken(accessToken);
      if (!roles.includes(accessRole)) next(ApiError.UnauthorizedError());

      next();
    } catch (err) {
      next(ApiError.UnauthorizedError());
    }
  };

export default checkRole;
