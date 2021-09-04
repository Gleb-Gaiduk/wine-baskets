import wineTypesService from '@srcPath/domains/wineTypes/services/wineTypes.service';
import { NextFunction, Request, Response } from 'express';

class WineTypesMiddleware {
  async validateSameTypeDoesntExist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const existingType = await wineTypesService.getByType(req.body.type);
    if (existingType) {
      res.status(400).send({ error: 'Wine type already exists' });
    } else next();
  }
}

export default new WineTypesMiddleware();
