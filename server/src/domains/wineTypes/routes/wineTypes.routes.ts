import BodyValidationMiddleware from '@srcPath/common/middlewares/bodyValidation.middleware';
import {
  WINE_TYPES_ROUTE,
  WINE_TYPE_ROUTE,
} from '@srcPath/common/routes/constants.routes';
import wineTypesController from '@srcPath/domains/wineTypes/controllers/wineTypes.controller';
import wineTypesMiddleware from '@srcPath/domains/wineTypes/middlewares/wineTypes.middleware';
import { Application } from 'express';
import { body, param } from 'express-validator';
import CommonRoutesConfig from '../../../common/routes/common.routes';

class WineTypesRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'wineTypesRoutes');
  }

  configureRoutes() {
    this.app
      .route(WINE_TYPES_ROUTE)

      .get(wineTypesController.getWineTypes)
      .post(
        body('type')
          .isString()
          .withMessage(
            'Invalid "type" parameter: value should be of a string type'
          ),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        wineTypesMiddleware.validateSameTypeDoesntExist,

        wineTypesController.createWineType
      );

    this.app
      .route(WINE_TYPE_ROUTE)

      .all(
        param('wineTypeId')
          .isNumeric()
          .withMessage('"wine_type_id" parameter should be a number'),
        BodyValidationMiddleware.verifyBodyFieldsErrors
      )

      .get(wineTypesController.getWineTypeById)

      .put(
        body('type')
          .isString()
          .withMessage(
            'Invalid "type" parameter: value should be of a string type'
          ),
        BodyValidationMiddleware.verifyBodyFieldsErrors,

        wineTypesController.updateWineTypeById
      )

      .delete(wineTypesController.removeWineTypeById);
    return this.app;
  }
}

export default WineTypesRoutes;
