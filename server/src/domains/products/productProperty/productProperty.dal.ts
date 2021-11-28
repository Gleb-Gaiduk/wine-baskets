import dbConfig from '@srcPath/common/db/db.config';
import { tableNames } from '@srcPath/common/db/db.constants';
import { getDbQueryParamsString } from '@srcPath/common/utils/dataTransform.utils';
import productPropertyService from './productProperty.service';
import {
  TProductPropertyFromDb,
  TProductPropertyTypeFromDb,
} from './productProperty.types';

class ProductPropertyDal {
  async getPropertyType(
    isTypeExists: boolean,
    propertyName: string
  ): Promise<TProductPropertyTypeFromDb> {
    if (isTypeExists) return await this.getPropertyTypeByName(propertyName);
    return await productPropertyService.createPropertyType(propertyName);
  }

  async getPropertyTypeByName(
    propertyType: string
  ): Promise<TProductPropertyTypeFromDb> {
    return (
      await dbConfig.query<TProductPropertyTypeFromDb>(
        `SELECT * FROM ${tableNames.ProductPropertyType} WHERE property_type=$1`,
        [propertyType]
      )
    ).rows[0];
  }

  async getPropertyTypesByNameList(
    propertyTypes: string[]
  ): Promise<TProductPropertyTypeFromDb[]> {
    return (
      await dbConfig.query<TProductPropertyTypeFromDb>(
        `SELECT * FROM ${tableNames.ProductPropertyType} WHERE property_type IN` +
          getDbQueryParamsString(propertyTypes.length),
        propertyTypes
      )
    ).rows;
  }

  async getPropertyValueByName(
    propertyValue: string
  ): Promise<TProductPropertyFromDb> {
    return (
      await dbConfig.query<TProductPropertyFromDb>(
        `SELECT * FROM ${tableNames.ProductProperty} WHERE property_name=$1`,
        [propertyValue]
      )
    ).rows[0];
  }

  async getPropertyValues(
    propertyTypeIds: number[],
    propertyValues: string[]
  ): Promise<TProductPropertyFromDb[]> {
    return (
      await dbConfig.query<TProductPropertyFromDb>(
        `SELECT * FROM ${tableNames.ProductProperty} WHERE property_type_id IN
         ${getDbQueryParamsString(
           propertyTypeIds.length
         )} AND property_name IN${getDbQueryParamsString(
          propertyValues.length,
          propertyTypeIds.length + 1
        )}`,
        [...propertyTypeIds, ...propertyValues]
      )
    ).rows;
  }
}

export default new ProductPropertyDal();
