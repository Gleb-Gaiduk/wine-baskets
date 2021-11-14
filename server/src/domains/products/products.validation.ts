import { body } from 'express-validator';

export const validateProductPayload = () => {
  return [
    body('productName')
      .isString()
      .withMessage(
        'Invalid "productName" parameter: value should be of a string type.'
      ),
    body('productImageSrc')
      .isString()
      .withMessage(
        'Invalid "productImageSrc" parameter: value should be of a string type.'
      ),
    body('productPrice')
      .isNumeric()
      .withMessage(
        'Invalid "productPrice" parameter: value should be of a number type.'
      ),
    body('productCategory')
      .isString()
      .withMessage(
        'Invalid "productCategory" parameter: value should be of a string type.'
      ),
    // check('productProperties.*.propertyName')
    //   .isString()
    //   .withMessage(
    //     'Invalid "propertyName" parameter: value should be of a string type.'
    //   ),
    // check('productProperties.*.propertyValue')
    //   .not()
    //   .isString()
    //   .withMessage(
    //     'Invalid "propertyValue" parameter: value should be either of a string or a number type.'
    //   ),
  ];
};
