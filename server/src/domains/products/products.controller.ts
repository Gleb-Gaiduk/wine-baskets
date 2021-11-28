import { getQueryParams } from '@srcPath/common/utils/getEndpointParams.utils';
import productsService from '@srcPath/domains/products/products.service';
import { NextFunction, Request, Response } from 'express';
import { DBPropertyNotExistError } from '../../common/errors/DBValidation.error';

class ProductsController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    const reqQueryParams = req.query;

    const defaultCustomParams = {
      productCategory: 'all',
      minPrice: 0,
      maxPrice: Infinity,
      name: '',
    };

    const queryParams = getQueryParams<typeof reqQueryParams>(
      defaultCustomParams,
      reqQueryParams
    );

    try {
      const products = await productsService.getAll(queryParams);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }

  async getProductById(req: Request, res: Response) {
    const productId = req.params.productId;
    const product = await productsService.getById(productId);

    if (product instanceof DBPropertyNotExistError) {
      res.status(product.statusCode).json(product.getErrorObject());
    } else {
      res.status(200).json(product);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    const productPayloadBody = req.body;

    try {
      const newProduct = await productsService.create(productPayloadBody);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }

  // async removeProductById(req: Request, res: Response) {
  //   const removedProduct = await productsService.deleteById(
  //     req.params.productId
  //   );

  //   if (removedProduct instanceof DBPropertyNotExistError) {
  //     res
  //       .status(removedProduct.statusCode)
  //       .json(removedProduct.getErrorObject());
  //   } else {
  //     res.status(204).json({});
  //   }
  // }

  // async updateProductById(req: Request, res: Response) {
  //   const updatedProduct = await productsService.putById(
  //     req.params.ProductId,
  //     req.body
  //   );

  //   if (updatedProduct instanceof DBPropertyNotExistError) {
  //     res
  //       .status(updatedProduct.statusCode)
  //       .json(updatedProduct.getErrorObject());
  //   } else {
  //     res.status(200).json(updatedProduct);
  //   }
  // }
}

export default new ProductsController();
