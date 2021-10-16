import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';

export interface ICreateWineType {
  type: string;
}

export interface IWineType extends ICreateWineType {
  wine_type_id: string;
}

export type TGetWineTypes = Array<IWineType> | [];
export type TGetWineTypeById = IWineType | DBPropertyNotExistError;
export type TCreateWineType = ICreateWineType;
export type TPutWineType = IWineType | DBPropertyNotExistError;
export type TDeleteWineType = {} | DBPropertyNotExistError;
