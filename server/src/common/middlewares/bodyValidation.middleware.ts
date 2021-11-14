import ApiError from '@srcPath/common/errors/api.error';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class BodyValidationMiddleware {
  verifyBodyFieldsErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        ApiError.BadRequest(
          'Body payload validation is failed, check passed data.',
          errors.array()
        )
      );
    }

    return next();
  }
}

export default new BodyValidationMiddleware();
