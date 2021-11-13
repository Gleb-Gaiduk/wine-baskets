import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';

export interface ICreateProduct {
  type: string;
}

export interface IProduct extends ICreateProduct {
  wine_type_id: string;
}

export type TGetProducts = Array<IProduct> | [];
export type TGetProductById = IProduct | DBPropertyNotExistError;
export type TCreateProduct = ICreateProduct;
export type TPutProduct = IProduct | DBPropertyNotExistError;
export type TDeleteProduct = {} | DBPropertyNotExistError;
