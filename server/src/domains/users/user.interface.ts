import { TAccessRole } from '@srcPath/domains/roles/roles.interface';
import { TTokens } from '@srcPath/domains/token/interfaces/token.interfaces';
import { DBPropertyNotExistError } from '../../common/errors/DBValidation.error';

export interface IUserFromClient {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  accessRole?: TAccessRole;
}

export interface IUserFromDB extends Omit<IUserFromClient, 'password'> {
  id: number | string;
  createdOn: string;
  activationLink: string;
  isActivated: boolean;
  tokens: TTokens;
}

export type TGetUsers = Array<IUserFromDB> | [];
export type TCreateUser = IUserFromDB;
export type TGetUserById = IUserFromDB | DBPropertyNotExistError;
export type TPutUser = IUserFromDB | DBPropertyNotExistError;
export type TDeleteUser = {} | DBPropertyNotExistError;

export interface IUserByEmailWithPassword {
  user_id: number;
  email: string;
  password: string;
  accessRole: TAccessRole;
}

export interface IUserTokenPayload {
  id: number;
  email: string;
  isActivated: boolean;
  accessRole: TAccessRole;
}
