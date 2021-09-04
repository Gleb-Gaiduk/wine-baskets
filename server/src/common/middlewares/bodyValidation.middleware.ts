import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class BodyValidationMiddleware {
  verifyBodyFieldsErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array()[0].msg);
    }

    next();
  }
}

export default new BodyValidationMiddleware();
