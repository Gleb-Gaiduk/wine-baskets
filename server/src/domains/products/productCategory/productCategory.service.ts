import dbConfig from '@srcPath/common/db/db.config';
import { tableNames } from '@srcPath/common/db/db.constants';
import { TProductCategoryFromDb } from './productCategory.types';

class ProductCategoryService {
  async create(productCategory: string): Promise<TProductCategoryFromDb> {
    return (
      await dbConfig.query<TProductCategoryFromDb>(
        `INSERT INTO ${tableNames.ProductCategory} (category_name) VALUES ($1) RETURNING *`,
        [productCategory.toLowerCase().trim()]
      )
    ).rows[0];
  }

  async createCategory_PropertyTypeIntersection(
    productCategoryId: number,
    productPropertyTypeId: number
  ): Promise<void> {
    await dbConfig.query<void>(
      `INSERT INTO ${tableNames.ProductCategory_ProductPropertyType} (product_category_id,product_property_type_id) VALUES ($1,$2)`,
      [productCategoryId, productPropertyTypeId]
    );
  }
}

export default new ProductCategoryService();
