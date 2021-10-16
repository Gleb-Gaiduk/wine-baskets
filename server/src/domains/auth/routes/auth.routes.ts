import BodyValidationMiddleware from '@srcPath/common/middlewares/bodyValidation.middleware';
import { passwordValidationPattern } from '@srcPath/common/middlewares/constansts.middlewares';
import CommonRoutesConfig from '@srcPath/common/routes/common.routes';
import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REFRESH_ROUTE,
} from '@srcPath/common/routes/constants.routes';
import { Application } from 'express';
import { body } from 'express-validator';
import authController from '../controllers/auth.controller';

class AuthRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'authRoutes');
  }

  configureRoutes(): Application {
    this.app.route(LOGIN_ROUTE).post(
      body('email').isEmail().withMessage('Email address is incorrect'),
      body('password').isString().withMessage('Password should be a string'),
      body('password')
        .matches(passwordValidationPattern)
        .withMessage('Password is not complied with the security standards'),
      BodyValidationMiddleware.verifyBodyFieldsErrors,

      authController.login
    );

    this.app.route(LOGOUT_ROUTE).post(authController.logout);

    this.app.route(REFRESH_ROUTE).get(authController.refreshToken);

    return this.app;
  }
}

export default AuthRoutes;
