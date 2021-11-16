import dbConfig from '@srcPath/common/db/db.config';
import { tableNames } from '@srcPath/common/db/db.constants';

class ProductCategoryService {
  async create(productCategory: string) {
    return await dbConfig.query(
      `INSERT INTO ${tableNames.ProductCategory} (category_name) VALUES ($1) RETURNING *`,
      [productCategory.toLowerCase().trim()]
    );
  }

  async getByName(categoryName: string) {
    return await dbConfig.query(
      `SELECT * FROM ${tableNames.ProductCategory} WHERE category_name=$1`,
      [categoryName.toLowerCase().trim()]
    );
  }
}

export default new ProductCategoryService();
