import BodyValidationMiddleware from '@srcPath/common/middlewares/bodyValidation.middleware';
import { accessRoleValidationPattern } from '@srcPath/common/middlewares/constansts.middlewares';
import CommonRoutesConfig from '@srcPath/common/routes/common.routes';
import { ROLES_ROUTE } from '@srcPath/common/routes/constants.routes';
import { Application } from 'express';
import { body } from 'express-validator';
import rolesController from './roles.controller';

class RolesRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'RolesRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route(ROLES_ROUTE)

      .get(rolesController.getRoles)
      .post(
        body('title')
          .matches(accessRoleValidationPattern)
          .withMessage('Incorrect role title has been passed'),
        body('description')
          .isString()
          .withMessage('Description should be a non-empty string'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,

        rolesController.createRole
      );

    return this.app;
  }
}

export default RolesRoutes;
