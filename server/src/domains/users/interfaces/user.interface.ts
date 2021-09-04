import { DBPropertyNotExistError } from './../../../common/errors/DBValidation.error';
export interface IUserFromClient {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
}

export interface IUserFromDB extends IUserFromClient {
  user_id: number | string;
  created_on: string;
}

export type TGetUsers = Array<IUserFromDB> | [];
export type TCreateUser = IUserFromDB;
export type TGetUserById = IUserFromDB | DBPropertyNotExistError;
export type TPutUser = IUserFromDB | DBPropertyNotExistError;
export type TDeleteUser = {} | DBPropertyNotExistError;
