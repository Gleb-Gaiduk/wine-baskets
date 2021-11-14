import BodyValidationMiddleware from '@srcPath/common/middlewares/bodyValidation.middleware';
import CommonRoutesConfig from '@srcPath/common/routes/common.routes';
import { productRoutes } from '@srcPath/common/routes/constants.routes';
import productsController from '@srcPath/domains/products/products.controller';
import { Application } from 'express';
import { body, param } from 'express-validator';
import { validateProductPayload } from './products.validation';

class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'productsRoutes');
  }

  configureRoutes() {
    this.app
      .route(productRoutes.getAll)

      .get(productsController.getProducts)

      .post(
        validateProductPayload(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        productsController.createProduct
      );

    this.app
      .route(productRoutes.getById)

      .all(
        param('productId')
          .isNumeric()
          .withMessage('"wine_type_id" parameter should be a number'),
        BodyValidationMiddleware.verifyBodyFieldsErrors
      )

      .get(productsController.getProductById)

      .put(
        body('type')
          .isString()
          .withMessage(
            'Invalid "type" parameter: value should be of a string type'
          ),
        BodyValidationMiddleware.verifyBodyFieldsErrors

        // productsController.updateProductById
      );

    // .delete(productsController.removeProductById);
    return this.app;
  }
}

export default ProductsRoutes;
