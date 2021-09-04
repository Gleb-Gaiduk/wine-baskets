import dbConfig from '@srcPath/common/db/db.config';
import { isExistingDbProperty } from '@srcPath/common/db/db.utils';
import Logger from '@srcPath/common/loaders/logger.loader';
import { CRUD } from '@srcPath/domains/wineTypes/interfaces/crud.interface';
import {
  TCreateUser,
  TDeleteUser,
  TGetUserById,
  TGetUsers,
  TPutUser,
} from '../interfaces/user.interface';
import { DBPropertyNotExistError } from './../../../common/errors/DBValidation.error';
import { IUserFromClient } from './../interfaces/user.interface';

class UsersServices
  implements CRUD<TGetUsers, TGetUserById, TCreateUser, TDeleteUser, TPutUser>
{
  async getAll(limit: number = 10, page: number = 1): Promise<TGetUsers> {
    try {
      const users = await dbConfig.query('SELECT * FROM "user"');
      return users.rows;
    } catch (error) {
      Logger.error(error);
    }
  }

  async create({
    firstName,
    lastName,
    email,
    password,
    phone,
  }: IUserFromClient): Promise<TCreateUser> {
    try {
      const createdOn = new Date(Date.now()).toUTCString();
      const newUser = await dbConfig.query(
        'INSERT INTO "user" (first_name, last_name, email, password, phone, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [firstName, lastName, email, password, phone, createdOn]
      );

      return newUser.rows[0];
    } catch (err) {
      Logger.error(err);
    }
  }

  async getById(id: string): Promise<TGetUserById> {
    try {
      const isExistingUser = await isExistingDbProperty('user', 'user_id', id);

      if (!isExistingUser) {
        throw new DBPropertyNotExistError('user_id');
      } else {
        const user = await dbConfig.query(
          'SELECT * FROM "user" WHERE user_id = $1',
          [id]
        );
        return user.rows[0];
      }
    } catch (err) {
      Logger.error(err.message);
      return err;
    }
  }

  async putById(
    id: string,
    { firstName, lastName, email, password, phone }: IUserFromClient
  ): Promise<TPutUser> {
    try {
      const isExistingUser = await isExistingDbProperty('user', 'user_id', id);

      if (!isExistingUser) {
        throw new DBPropertyNotExistError('user_id');
      } else {
        const updatedUser = await dbConfig.query(
          'UPDATE "user" SET first_name = $1, last_name = $2, email = $3, password = $4, phone = $5 WHERE user_id = $6 RETURNING *',
          [firstName, lastName, email, password, phone, id]
        );
        return updatedUser.rows[0];
      }
    } catch (err) {
      Logger.error(err.message);
      return err;
    }
  }

  async deleteById(id: string): Promise<TDeleteUser> {
    try {
      const isExistingUser = await isExistingDbProperty('user', 'user_id', id);

      if (!isExistingUser) {
        throw new DBPropertyNotExistError('user_id');
      } else {
        const removedUser = await dbConfig.query(
          'DELETE FROM "user" WHERE user_id = $1',
          [id]
        );
        return removedUser.rows[0];
      }
    } catch (err) {
      Logger.error(err.message);
      return err;
    }
  }
}

export default new UsersServices();
