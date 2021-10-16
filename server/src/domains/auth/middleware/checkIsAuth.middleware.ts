import ApiError from '@srcPath/common/errors/api.error';
import tokenService from '@srcPath/domains/token/services/token.service';
import { NextFunction, Request, Response } from 'express';

const checkIsAuthorized = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) next(ApiError.UnauthorizedError());

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) next(ApiError.UnauthorizedError());

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) next(ApiError.UnauthorizedError());

    next();
  } catch (err) {
    next(ApiError.UnauthorizedError());
  }
};

export default checkIsAuthorized;
