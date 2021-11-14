import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';

type TIdentificator = { id: string | number };

export type TProductProperty = {
  propertyName: string;
  propertyValue: string | number;
  propertyDescription?: string;
};

export interface IPostProductPayload {
  productName: string;
  productImageSrc: string;
  productPrice: number;
  productCategory: string;
  productProperties: TProductProperty[];
}

export interface IProduct {
  wine_type_id: string;
}

export type TGetProducts = Array<IProduct> | [];
export type TGetProductById = IProduct | DBPropertyNotExistError;
export type TPostProductRes = IPostProductPayload & TIdentificator;
export type TPutProduct = IProduct | DBPropertyNotExistError;
export type TDeleteProduct = {} | DBPropertyNotExistError;
