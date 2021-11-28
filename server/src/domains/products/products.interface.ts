import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';
import { IDefaultGetQueryParams } from '@srcPath/common/types/crud.interface';
import { TProductPropertyFromDb } from './productProperty/productProperty.types';

export type TIdentificator = { id: number };
export interface IPostProductPayload {
  productName: string;
  productImageSrc: string;
  productPrice: string;
  productCategory: string;
  productProperties: TProductProperty[];
}

export type TProductProperty = {
  propertyName: string;
  propertyValue: string;
  propertyDescription?: string;
};
export interface IProductFromDb {
  id: number;
  name: string;
  image_path: string;
  item_price: string;
  category_name: string;
}

export type TProductWithPropsFromDb = IProductFromDb & {
  productProperties: Omit<
    TProductPropertyFromDb[],
    TProductPropertyFromDb['property_type_id']
  >;
};
export interface IProductQueryParams extends IDefaultGetQueryParams {
  minPrice: number;
  maxPrice: number;
  productCategory: string;
  name: string;
}

// Products CRUD services results types
export type TGetProducts = Array<IPostProductPayload> | [];
export type TGetProductById = IPostProductPayload | DBPropertyNotExistError;
export type TPostProductRes = IPostProductPayload & TIdentificator;
export type TPutProduct = IPostProductPayload | DBPropertyNotExistError;
export type TDeleteProduct = {} | DBPropertyNotExistError;
