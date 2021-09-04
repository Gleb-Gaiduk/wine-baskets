import BodyValidationMiddleware from '@srcPath/common/middlewares/bodyValidation.middleware';
import CommonRoutesConfig from '@srcPath/common/routes/common.routes';
import {
  USERS_ROUTE,
  USER_ROUTE,
} from '@srcPath/common/routes/constants.routes';
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

      .get(usersController.getUsers)

      .post(
        body('firstName')
          .isString()
          .withMessage('First name should be a non-empty string'),
        body('lastName')
          .isString()
          .withMessage('Last name should be a non-empty string'),
        body('email').isEmail().withMessage('Email address is incorrect'),
        body('password')
          .matches(
            '^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]))).{8,32}$'
          )
          .withMessage('Password is not complied with the security standards'),
        BodyValidationMiddleware.verifyBodyFieldsErrors,

        usersController.postUsers
      );

    this.app
      .route(USER_ROUTE)

      .all(
        param('userId')
          .isNumeric()
          .withMessage('"userId" parameter should be a number'),
        BodyValidationMiddleware.verifyBodyFieldsErrors
      )

      .get(usersController.getUserById)
      .put(usersController.updateUserById)
      .delete(usersController.deleteUserById);

    return this.app;
  }
}

export default UsersRoutes;
