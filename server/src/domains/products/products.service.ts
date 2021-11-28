import dbConfig from '@srcPath/common/db/db.config';
import { isExistingDbProperty } from '@srcPath/common/db/db.utils';
import ApiError from '@srcPath/common/errors/api.error';
import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';
import { CRUD } from '@srcPath/common/types/crud.interface';
import {
  getDbQueryParamsString,
  getIdsFromDbResponse,
} from '@srcPath/common/utils/dataTransform.utils';
import {
  IPostProductPayload,
  IProductFromDb,
  IProductQueryParams,
  TDeleteProduct,
  TGetProductById,
  TGetProducts,
  TIdentificator,
  TPostProductRes,
  TProductPropertyFromDb,
  TProductWithPropsFromDb,
  TPutProduct,
} from '@srcPath/domains/products/products.interface';
import { isEmpty } from 'lodash';
import { tableNames } from './../../common/db/db.constants';
import productCategoryDal from './productCategory/productCategory.dal';
import productPropertyDal from './productProperty/productProperty.dal';
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
  // GET
  async getAll(queryParams: IProductQueryParams): Promise<TGetProducts> {
    // Product property type retrieval
    const productPropertiesTypes = Object.keys(queryParams);
    const productPropertyTypesIds = getIdsFromDbResponse(
      await productPropertyDal.getPropertyTypesByNameList(
        productPropertiesTypes
      )
    );

    // Product properties retrieval
    let productPropertyValuesFromDb: TProductPropertyFromDb[] | null = null;

    if (!isEmpty(productPropertyTypesIds)) {
      productPropertyValuesFromDb = await productPropertyDal.getPropertyValues(
        productPropertyTypesIds,
        Object.values(queryParams)
      );
    }

    const whereString = [];
    let propertiesArgs: number[] | null = null;

    // Product category WHERE string setting
    // Product category retrievals
    const productCategoryId: number | null =
      queryParams.productCategory === 'all'
        ? null
        : (
            await dbConfig.query<TIdentificator>(
              `SELECT id FROM ${tableNames.ProductCategory} WHERE category_name=$1`,
              [queryParams.productCategory]
            )
          ).rows[0].id;

    if (productCategoryId) {
      whereString.push(`product_category_id=${productCategoryId}`);
    }

    // Properties WHERE string setting
    if (!isEmpty(productPropertyTypesIds)) {
      propertiesArgs = [
        ...productPropertyTypesIds,
        ...productPropertyValuesFromDb.map(
          propValue => propValue.property_name
        ),
      ];
    }

    // Price range WHERE string setting
    let priceRangeString = null;

    if (
      queryParams.minPrice > 0 &&
      queryParams.maxPrice !== Infinity &&
      queryParams.minPrice < queryParams.maxPrice
    ) {
      priceRangeString = `item_price >= ${queryParams.minPrice} AND item_price <= ${queryParams.maxPrice}`;
    } else if (queryParams.minPrice > 0) {
      priceRangeString = `item_price >= ${queryParams.minPrice}`;
    } else if (queryParams.maxPrice !== Infinity) {
      priceRangeString = `item_price <= ${queryParams.maxPrice}`;
    }
    if (priceRangeString) whereString.push(priceRangeString);

    // Product name WHERE string setting
    if (queryParams.name) whereString.push(`name='${queryParams.name}'`);

    const wherePropertiesString = !isEmpty(propertiesArgs)
      ? `WHERE ${tableNames.Product}.id IN (SELECT product_id FROM ${
          tableNames.ProductProperty_Product
        } WHERE product_property_id IN (SELECT id FROM ${
          tableNames.ProductProperty
        } WHERE property_type_id IN ${getDbQueryParamsString(
          productPropertyTypesIds.length
        )} AND property_name IN ${getDbQueryParamsString(
          productPropertyValuesFromDb.length,
          productPropertyTypesIds.length + 1
        )}) GROUP BY product_id HAVING COUNT(*) > ${
          productPropertyTypesIds.length > 0 ? 1 : 0
        })`
      : '';

    const whereBasicParamsString = !isEmpty(whereString)
      ? ` ${wherePropertiesString ? 'AND' : 'WHERE'} ${whereString.join(
          ' AND '
        )}`
      : '';

    const productString = `SELECT ${
      tableNames.Product
    }.id, name, image_path, item_price, category_name FROM ${
      tableNames.Product
    } INNER JOIN ${tableNames.ProductCategory} ON ${
      tableNames.Product
    }.product_category_id=${
      tableNames.ProductCategory
    }.id ${wherePropertiesString} ${whereBasicParamsString} LIMIT ${
      queryParams.limit
    } OFFSET ${--queryParams.page}`;

    const products = (
      await dbConfig.query<IProductFromDb>(productString, propertiesArgs)
    ).rows;

    const productsIds = products.map(item => item.id);

    const productsProperties = (
      await dbConfig.query<TProductPropertyFromDb & TIdentificator>(
        `SELECT property_name, property_description, property_type, product_id as id FROM ${
          tableNames.ProductProperty
        } INNER JOIN ${tableNames.ProductPropertyType} ON ${
          tableNames.ProductProperty
        }.property_type_id=${tableNames.ProductPropertyType}.id
      INNER JOIN ${tableNames.ProductProperty_Product} ON ${
          tableNames.ProductProperty
        }.id=${tableNames.ProductProperty_Product}.product_property_id
      WHERE ${
        tableNames.ProductProperty
      }.id IN (SELECT product_property_id FROM ${
          tableNames.ProductProperty_Product
        } WHERE product_id IN ${getDbQueryParamsString(productsIds.length)})
      `,
        productsIds
      )
    ).rows;

    const productsWithProperties = products.map(
      (product: IProductFromDb & TProductWithPropsFromDb) => {
        const mappedProductProperties = productsProperties.filter(
          property => property.id === product.id
        );

        if (!isEmpty(mappedProductProperties))
          product.productProperties = mappedProductProperties;

        return new ProductFromDbDTO(product);
      }
    );

    return productsWithProperties;
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

  // POST
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

    const isCategoryExist = await isExistingDbProperty(
      tableNames.ProductCategory,
      'category_name',
      productCategory
    );

    const productCategoryFromDb = await productCategoryDal.getFromDb(
      productCategory,
      isCategoryExist
    );

    const newProduct = (
      await dbConfig.query<
        Omit<IProductFromDb, 'category_name'> & { product_category_id: number }
      >(
        `INSERT INTO ${tableNames.Product} (name, image_path, item_price, product_category_id) VALUES ($1,$2,$3,$4) RETURNING *`,
        [productName, productImageSrc, productPrice, productCategoryFromDb.id]
      )
    ).rows[0];

    const newProductProperties =
      await productPropertyService.createPropertiesForProduct(
        productProperties,
        newProduct.id,
        productCategoryFromDb.id
      );

    return new ProductFromDbDTO({
      ...newProduct,
      category_name: productCategoryFromDb.category_name,
      productProperties: newProductProperties,
    });
  }

  // PUT
  // async putById(id: string) {}

  // DELETE
  // async deleteById(id: string) {}
}

export default new ProductsService();
