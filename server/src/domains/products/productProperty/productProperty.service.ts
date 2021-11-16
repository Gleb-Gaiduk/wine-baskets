import dbConfig from '@srcPath/common/db/db.config';
import { tableNames } from '@srcPath/common/db/db.constants';
import {
  getTrimmedArrayWithProps,
  isExistingDbProperty,
} from '@srcPath/common/db/db.utils';
import { TProductProperty } from '../products.interface';
import { TProductPropertyTypeFromDb } from './productProperty.types';

class ProductPropertyService {
  async createPropertyType(propertyType: string): Promise<any> {
    const propertyTypeData = await dbConfig.query(
      `INSERT INTO ${tableNames.ProductPropertyType} (property_type) VALUES ($1) RETURNING *`,
      [propertyType]
    );

    return propertyTypeData.rows;
  }

  async createPropertyValue(
    propertyValue: string | number,
    propertyDescription: string | null,
    propertyTypeId
  ) {
    const propertyValueData = await dbConfig.query(
      `INSERT INTO ${tableNames.ProductProperty} (property_name, property_description, property_type_id) VALUES ($1, $2, $3) RETURNING *`,
      [propertyValue, propertyDescription, propertyTypeId]
    );
    return propertyValueData.rows;
  }

  async createCategory_PropertyTypeIntersection(
    productCategoryId: number,
    productPropertyTypeId: number
  ): Promise<void> {
    await dbConfig.query(
      `INSERT INTO ${tableNames.ProductCategory_ProductPropertyType} (product_category_id,product_property_type_id) VALUES ($1,$2)`,
      [productCategoryId, productPropertyTypeId]
    );
  }

  async createPropertiesForProduct(
    productProperties: TProductProperty[],
    productId: number,
    productCategoryId: number
  ): Promise<TProductProperty[]> {
    const trimmedProperties =
      getTrimmedArrayWithProps<TProductProperty[]>(productProperties);

    trimmedProperties.forEach(
      async ({ propertyName, propertyValue, propertyDescription }) => {
        const isProductPropertyTypeExist = await isExistingDbProperty(
          tableNames.ProductPropertyType,
          'property_type',
          propertyName
        );

        let productPropertyType = null;

        if (!isProductPropertyTypeExist) {
          productPropertyType = await this.createPropertyType(propertyName);
          await this.createCategory_PropertyTypeIntersection(
            productCategoryId,
            productPropertyType[0].id
          );
        } else {
          productPropertyType = await this.getPropertyTypeByName(propertyName);
        }

        const newPropertyValueData = await this.createPropertyValue(
          propertyValue,
          propertyDescription,
          productPropertyType[0].id
        );

        await dbConfig.query(
          `INSERT INTO ${tableNames.ProductProperty_Product} (product_property_id, product_id) VALUES ($1,$2) RETURNING *`,
          [newPropertyValueData[0].id, productId]
        );
      }
    );
    return trimmedProperties;
  }

  async getPropertyTypeByName(
    propertyType: string
  ): Promise<TProductPropertyTypeFromDb[]> {
    const productPropertyType = await dbConfig.query(
      `SELECT * FROM ${tableNames.ProductPropertyType} WHERE property_type=$1`,
      [propertyType]
    );
    return productPropertyType.rows as TProductPropertyTypeFromDb[];
  }
}

export default new ProductPropertyService();
