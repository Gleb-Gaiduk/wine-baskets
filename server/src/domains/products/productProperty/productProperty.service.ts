import dbConfig from '@srcPath/common/db/db.config';
import { tableNames } from '@srcPath/common/db/db.constants';
import {
  getTrimmedArrayWithProps,
  isExistingDbProperty,
} from '@srcPath/common/db/db.utils';
import productCategoryService from '../productCategory/productCategory.service';
import { TProductProperty } from '../products.interface';
import { default as ProductPropertyDal } from './productProperty.dal';
import {
  TCreatePropertiesForProduct,
  TProductPropertyFromDb,
  TProductPropertyTypeFromDb,
} from './productProperty.types';

class ProductPropertyService {
  async createPropertyType(
    propertyType: string
  ): Promise<TProductPropertyTypeFromDb> {
    const propertyTypeData = await dbConfig.query<TProductPropertyTypeFromDb>(
      `INSERT INTO ${tableNames.ProductPropertyType} (property_type) VALUES ($1) RETURNING *`,
      [propertyType]
    );

    return propertyTypeData.rows[0];
  }

  async createPropertyValue(
    propertyValue: string | number,
    propertyDescription: string | null,
    propertyTypeId
  ): Promise<TProductPropertyFromDb> {
    return (
      await dbConfig.query<TProductPropertyFromDb>(
        `INSERT INTO ${tableNames.ProductProperty} (property_name, property_description, property_type_id) VALUES ($1, $2, $3) RETURNING *`,
        [propertyValue, propertyDescription, propertyTypeId]
      )
    ).rows[0];
  }

  async createPropertiesForProduct(
    productProperties: TProductProperty[],
    productId: number,
    productCategoryId: number
  ): Promise<TCreatePropertiesForProduct> {
    const newProductProperties: TCreatePropertiesForProduct = [];
    const trimmedProperties =
      getTrimmedArrayWithProps<TProductProperty[]>(productProperties);

    const addPropertiesToDb = async (): Promise<void> => {
      for (const newProperty of trimmedProperties) {
        const isProductPropertyTypeExist = await isExistingDbProperty(
          tableNames.ProductPropertyType,
          'property_type',
          newProperty.propertyName
        );

        const productPropertyType = await ProductPropertyDal.getPropertyType(
          isProductPropertyTypeExist,
          newProperty.propertyName
        );

        // Create new ProductCategory_ProductPropertyType intersection for a new property
        if (!isProductPropertyTypeExist) {
          await productCategoryService.createCategory_PropertyTypeIntersection(
            productCategoryId,
            productPropertyType[0].id
          );
        }

        const isProductPropertyValueExists = await isExistingDbProperty(
          tableNames.ProductProperty,
          'property_name',
          newProperty.propertyValue
        );

        let productPropertyValueId: number | null = null;

        if (isProductPropertyValueExists) {
          productPropertyValueId = (
            await ProductPropertyDal.getPropertyValueByName(
              newProperty.propertyValue
            )
          ).id;

          newProductProperties.push({
            property_type: productPropertyType.property_type,
            property_name: newProperty.propertyValue,
            property_description: newProperty.propertyDescription,
          });
        } else {
          const { id, property_name, property_description } =
            await this.createPropertyValue(
              newProperty.propertyValue,
              newProperty.propertyDescription,
              productPropertyType.id
            );

          productPropertyValueId = id;

          newProductProperties.push({
            property_type: productPropertyType.property_type,
            property_name,
            property_description,
          });
        }

        await this.createProductProperty_ProductIntersection(
          productPropertyValueId,
          productId
        );
      }
    };

    await addPropertiesToDb();
    return newProductProperties;
  }

  async createProductProperty_ProductIntersection(
    propertyValueId: number,
    productId: number
  ): Promise<void> {
    await dbConfig.query(
      `INSERT INTO ${tableNames.ProductProperty_Product} (product_property_id, product_id) VALUES ($1,$2) RETURNING *`,
      [propertyValueId, productId]
    );
  }
}

export default new ProductPropertyService();
