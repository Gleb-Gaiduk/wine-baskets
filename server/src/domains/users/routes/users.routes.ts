import BodyValidationMiddleware from '@srcPath/common/middlewares/bodyValidation.middleware';
import { passwordValidationPattern } from '@srcPath/common/middlewares/constansts.middlewares';
import CommonRoutesConfig from '@srcPath/common/routes/common.routes';
import {
  ACTIVATION_ROUTE,
  USERS_REGISTER_ROUTE,
  USERS_ROUTE,
  USER_ROUTE,
} from '@srcPath/common/routes/constants.routes';
import checkIsAuthorized from '@srcPath/domains/auth/middleware/checkIsAuth.middleware';
import checkRole from '@srcPath/domains/roles/middleware/checkRole.middleware';
import { Application } from 'express';
import { body, param } from 'express-validator';
import usersController from '../controllers/users.controller';

class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UsersRoute');
  }

  configureRoutes(): Application {
    this.app
      .route(USERS_ROUTE)
      .get(checkIsAuthorized, checkRole(['admin']), usersController.getUsers);

    this.app.route(USERS_REGISTER_ROUTE).post(
      body('firstName')
        .isString()
        .withMessage('First name should be a non-empty string'),
      body('lastName')
        .isString()
        .withMessage('Last name should be a non-empty string'),
      body('email').isEmail().withMessage('Email address is incorrect'),

      body('password').isString().withMessage('Password should be a string'),
      body('password')
        .matches(passwordValidationPattern)
        .withMessage('Password is not complied with the security standards'),
      BodyValidationMiddleware.verifyBodyFieldsErrors,

      usersController.registerUser
    );

    this.app.route(ACTIVATION_ROUTE).get(
      param('activationLink')
        .isString()
        .withMessage('"activation link" query parameter was not provided'),
      BodyValidationMiddleware.verifyBodyFieldsErrors,

      usersController.activateAccount
    );

    this.app
      .route(USER_ROUTE)
      .all(
        param('userId')
          .isNumeric()
          .withMessage('"userId" parameter should be a number'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        checkRole(['admin'])
      )

      .get(usersController.getUserById)
      .put(usersController.updateUserById)
      .delete(usersController.deleteUserById);

    return this.app;
  }
}

export default UsersRoutes;
