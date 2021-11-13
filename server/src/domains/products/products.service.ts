import dbConfig from '@srcPath/common/db/db.config';
import { isExistingDbProperty } from '@srcPath/common/db/db.utils';
import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';
import { CRUD } from '@srcPath/domains/products/interfaces/crud.interface';
import {
  TCreateProduct,
  TDeleteProduct,
  TGetProductById,
  TGetProducts,
  TPutProduct,
} from '@srcPath/domains/products/interfaces/products.interface';

class ProductsService
  implements
    CRUD<
      TGetProducts,
      TGetProductById,
      TCreateProduct,
      TDeleteProduct,
      TPutProduct
    >
{
  static tableName = 'Product';

  async getAll(limit: number, page: number): Promise<TGetProducts> {
    const products = await dbConfig.query(
      `SELECT * FROM ${ProductsService.tableName}`
    );
    return products.rows;
  }

  async getById(id: string): Promise<TGetProductById> {
    const isExistingTypeRecord = await isExistingDbProperty(
      ProductsService.tableName,
      'product_id',
      id
    );

    if (!isExistingTypeRecord) {
      throw new DBPropertyNotExistError('product_id');
    } else {
      const product = await dbConfig.query(
        `SELECT * FROM ${ProductsService.tableName} WHERE product_id = $1`,
        [id]
      );
      return product.rows[0];
    }
  }

  async create(): Promise<TCreateProduct> {}

  // async deleteById(id: string) {}

  // async putById(id: string) {}
}

export default new ProductsService();
