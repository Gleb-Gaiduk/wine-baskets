import wineTypesService from '@srcPath/domains/wine/wineTypes/services/wineTypes.service';
import { Request, Response } from 'express';
import { DBPropertyNotExistError } from '../../../../common/errors/DBValidation.error';

class WineTypesController {
  async getWineTypes(req: Request, res: Response) {
    const wineTypes = await wineTypesService.getAll(10, 1);
    res.status(200).json(wineTypes);
  }

  async getWineTypeById(req: Request, res: Response) {
    const wineType = await wineTypesService.getById(req.params.wineTypeId);

    if (wineType instanceof DBPropertyNotExistError) {
      res.status(wineType.statusCode).json(wineType.getErrorObject());
    } else {
      res.status(200).json(wineType);
    }
  }

  async createWineType(req: Request, res: Response) {
    const newWineType = await wineTypesService.create(req.body);
    res.status(201).json(newWineType);
  }

  async removeWineTypeById(req: Request, res: Response) {
    const removedWineType = await wineTypesService.deleteById(
      req.params.wineTypeId
    );

    if (removedWineType instanceof DBPropertyNotExistError) {
      res
        .status(removedWineType.statusCode)
        .json(removedWineType.getErrorObject());
    } else {
      res.status(204).json({});
    }
  }

  async updateWineTypeById(req: Request, res: Response) {
    const updatedWineType = await wineTypesService.putById(
      req.params.wineTypeId,
      req.body
    );

    if (updatedWineType instanceof DBPropertyNotExistError) {
      res
        .status(updatedWineType.statusCode)
        .json(updatedWineType.getErrorObject());
    } else {
      res.status(200).json(updatedWineType);
    }
  }
}

export default new WineTypesController();
