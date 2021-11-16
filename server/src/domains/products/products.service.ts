import { CRUD } from '@srcPath/common/db/crud.interface';
import dbConfig from '@srcPath/common/db/db.config';
import { isExistingDbProperty } from '@srcPath/common/db/db.utils';
import ApiError from '@srcPath/common/errors/api.error';
import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';
import {
  IPostProductPayload,
  TDeleteProduct,
  TGetProductById,
  TGetProducts,
  TPostProductRes,
  TPutProduct,
} from '@srcPath/domains/products/products.interface';
import { tableNames } from './../../common/db/db.constants';
import productCategoryService from './productCategory/productCategory.service';
import productPropertyService from './productProperty/productProperty.service';
import { ProductFromDbDTO } from './products.dto';

class ProductsService
  implements
    CRUD<
      TGetProducts,
      TGetProductById,
      TPostProductRes,
      TDeleteProduct,
      TPutProduct
    >
{
  async getAll(limit: number, page: number): Promise<TGetProducts> {
    const products = await dbConfig.query(
      `SELECT * FROM ${tableNames.Product}`
    );
    return products.rows as TGetProducts;
  }

  async getById(id: string): Promise<TGetProductById> {
    const isExistingTypeRecord = await isExistingDbProperty(
      tableNames.Product,
      'product_id',
      id
    );

    if (!isExistingTypeRecord) {
      throw new DBPropertyNotExistError('product_id');
    } else {
      const product = await dbConfig.query(
        `SELECT * FROM ${tableNames.Product} WHERE product_id = $1`,
        [id]
      );
      return product.rows[0] as TGetProductById;
    }
  }

  async create({
    productName,
    productImageSrc,
    productPrice,
    productCategory,
    productProperties,
  }: IPostProductPayload): Promise<TPostProductRes> {
    const isProductExist = await isExistingDbProperty(
      tableNames.Product,
      'name',
      productName.trim()
    );

    if (isProductExist) throw ApiError.BadRequest('Product already exists.');

    const isProductCategoryExist = await isExistingDbProperty(
      tableNames.ProductCategory,
      'category_name',
      productCategory
    );
    let productCategoryFromDb = null;

    if (!isProductCategoryExist) {
      productCategoryFromDb = await productCategoryService.create(
        productCategory
      );
    } else {
      productCategoryFromDb = await productCategoryService.getByName(
        productCategory
      );
    }

    const newProduct = await dbConfig.query(
      `INSERT INTO ${tableNames.Product} (name, image_path, item_price, product_category_id) VALUES ($1,$2,$3,$4) RETURNING *`,
      [
        productName,
        productImageSrc,
        productPrice,
        productCategoryFromDb.rows[0].id,
      ]
    );

    await dbConfig.query(
      `INSERT INTO ${tableNames.ProductCategory_Product} (product_category_id, product_id) VALUES ($1,$2)`,
      [productCategoryFromDb.rows[0].id, newProduct.rows[0].id]
    );

    const newProductProperties =
      await productPropertyService.createPropertiesForProduct(
        productProperties,
        newProduct.rows[0].id,
        productCategoryFromDb.rows[0].id
      );

    return new ProductFromDbDTO({
      ...newProduct.rows[0],
      productCategory: productCategoryFromDb.rows[0].category_name,
      productProperties: newProductProperties,
    });
  }

  // async deleteById(id: string) {}

  // async putById(id: string) {}
}

export default new ProductsService();
