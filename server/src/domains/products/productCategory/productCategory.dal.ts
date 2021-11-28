import dbConfig from '@srcPath/common/db/db.config';
import { tableNames } from '@srcPath/common/db/db.constants';
import productCategoryService from './productCategory.service';
import { TProductCategoryFromDb } from './productCategory.types';

class ProductCategoryDal {
  async getFromDb(
    categoryName: string,
    isCategoryExists: boolean
  ): Promise<TProductCategoryFromDb> {
    if (isCategoryExists) {
      return await this.getByName(categoryName);
    }
    return await productCategoryService.create(categoryName);
  }

  async getByName(categoryName: string): Promise<TProductCategoryFromDb> {
    return (
      await dbConfig.query<TProductCategoryFromDb>(
        `SELECT * FROM ${tableNames.ProductCategory} WHERE category_name=$1`,
        [categoryName.toLowerCase().trim()]
      )
    ).rows[0];
  }
}

export default new ProductCategoryDal();
