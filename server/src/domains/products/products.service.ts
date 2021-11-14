import { CRUD } from '@srcPath/common/db/crud.interface';
import dbConfig from '@srcPath/common/db/db.config';
import { isExistingDbProperty } from '@srcPath/common/db/db.utils';
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
    return products.rows;
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
      return product.rows[0];
    }
  }

  async create({
    productName,
    productImageSrc,
    productPrice,
    productCategory,
    productProperties,
  }: IPostProductPayload): Promise<TPostProductRes> {
    const isProductCategoryExist = await isExistingDbProperty(
      tableNames.ProductCategory,
      'category_name',
      productCategory
    );
    let productCategoryFromDb = null;

    if (!isProductCategoryExist) {
      productCategoryFromDb = await dbConfig.query(
        `INSERT INTO ${tableNames.ProductCategory} (category_name) VALUES ($1) RETURNING id`,
        [productCategory.toLowerCase().trim()]
      );
    } else {
      productCategoryFromDb = await dbConfig.query(
        `SELECT * FROM ${tableNames.ProductCategory} WHERE category_name=$1`,
        [productCategory.toLowerCase().trim()]
      );
    }

    productProperties.forEach(async property => {
      const propertyName = property.propertyName.trim();
      const propertyValue = property.propertyValue.trim();

      const isProductPropertyTypeExist = await isExistingDbProperty(
        tableNames.ProductPropertyType,
        'property_type',
        propertyName
      );

      const productPropertyType = await dbConfig.query(
        `SELECT * FROM ${tableNames.ProductPropertyType} WHERE property_type=$1`,
        [propertyName]
      );

      if (!isProductPropertyTypeExist) {
        // Todo create a separate service for properties
        await dbConfig.query(
          `INSERT INTO ${tableNames.ProductPropertyType} (property_type) VALUES ($1)`,
          [propertyName]
        );

        await dbConfig.query(
          `INSERT INTO ${tableNames.ProductCategory_ProductPropertyType} (product_category_id,product_property_type_id) VALUES ($1,$2)`,
          [productCategoryFromDb.rows[0].id, productPropertyType.rows[0].id]
        );
      }

      // Todo create a separate service for properties
      await dbConfig.query(
        `INSERT INTO ${tableNames.ProductProperty} (property_name, property_description, property_type_id) VALUES ($1, $2, $3)`,
        [
          propertyValue,
          property.propertyDescription,
          productPropertyType.rows[0].id,
        ]
      );
    });

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

    const newProductProperties = await dbConfig.query(
      `SELECT property_type, property_name, property_description FROM ${tableNames.ProductPropertyType} INNER JOIN ${tableNames.ProductProperty} ON ${tableNames.ProductPropertyType}.id = ${tableNames.ProductProperty}.id`,
      []
    );

    return new ProductFromDbDTO({
      ...newProduct.rows[0],
      productCategory: productCategoryFromDb.rows[0].category_name,
      productProperties: newProductProperties.rows,
    });
  }

  // async deleteById(id: string) {}

  // async putById(id: string) {}
}

export default new ProductsService();
