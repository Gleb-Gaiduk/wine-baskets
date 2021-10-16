import config from '@srcPath/common/config';
import dbConfig from '@srcPath/common/db/db.config';
import { isExistingDbProperty } from '@srcPath/common/db/db.utils';
import ApiError from '@srcPath/common/errors/api.error';
import Logger from '@srcPath/common/loaders/logger.loader';
import { createHashedPassword } from '@srcPath/common/utils/password.utils';
import rolesService from '@srcPath/domains/roles/services/roles.service';
import tokenService from '@srcPath/domains/token/services/token.service';
import { CRUD } from '@srcPath/domains/wine/wineTypes/interfaces/crud.interface';
import { v4 } from 'uuid';
import { UserFromDbDTO, UserTokenDTO } from '../DTOs/user.dto';
import {
  IUserByEmailWithPassword,
  TCreateUser,
  TDeleteUser,
  TGetUserById,
  TGetUsers,
  TPutUser,
} from '../interfaces/user.interface';
import { DBPropertyNotExistError } from './../../../common/errors/DBValidation.error';
import { IUserFromClient } from './../interfaces/user.interface';
import mailService from './mail.service';

class UsersServices
  implements CRUD<TGetUsers, TGetUserById, TCreateUser, TDeleteUser, TPutUser>
{
  async getAll(limit: number, page: number): Promise<TGetUsers> {
    try {
      const users = await dbConfig.query(
        'SELECT * FROM "user" LIMIT $1 OFFSET $2',
        [limit, --page]
      );
      return users.rows;
    } catch (err) {
      Logger.error(err);
    }
  }

  // User registration
  async create({
    firstName,
    lastName,
    email,
    password,
    phone,
    accessRole = 'customer',
  }: IUserFromClient): Promise<TCreateUser> {
    const isExistingUser = await isExistingDbProperty('user', 'email', email);

    if (isExistingUser)
      throw ApiError.BadRequest(
        `A user with the email ${email} is already exist`
      );

    const createdOn = new Date(Date.now()).toUTCString();
    const hashedPassword = await createHashedPassword(password);
    const activationLink = v4();

    const newUser = await dbConfig.query(
      'INSERT INTO "user" (first_name, last_name, email, password, phone, created_on, activation_link) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        firstName,
        lastName,
        email,
        hashedPassword,
        phone,
        createdOn,
        activationLink,
      ]
    );

    const userTokenDTO = new UserTokenDTO({ ...newUser.rows[0], accessRole });

    // Populate user_role table
    await rolesService.addRoleToUser(userTokenDTO.id, accessRole);
    await mailService.sendActivationMail(
      email,
      `${config.api.url}/api/activate/${activationLink}`
    );
    const newTokens = tokenService.generateToken({ ...userTokenDTO });
    await tokenService.saveTokenToDB(userTokenDTO.id, newTokens.refreshToken);
    return new UserFromDbDTO({ ...newUser.rows[0], ...newTokens, accessRole });
  }

  async activateAccount(activationLink: string) {
    const isExistingUser = await isExistingDbProperty(
      'user',
      'activation_link',
      activationLink
    );

    if (!isExistingUser)
      throw ApiError.BadRequest('Activation link is incorrect');

    await dbConfig.query(
      'UPDATE "user" SET is_activated = $1 WHERE activation_link = $2',
      [true, activationLink]
    );
  }

  async getById(id: string): Promise<TGetUserById> {
    try {
      const isExistingUser = await isExistingDbProperty('user', 'user_id', id);

      if (!isExistingUser) throw new DBPropertyNotExistError('user_id');

      const user = await dbConfig.query(
        'SELECT * FROM "user" WHERE user_id = $1',
        [id]
      );
      return user.rows[0];
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

      if (!isExistingUser) throw new DBPropertyNotExistError('user_id');
      const updatedUser = await dbConfig.query(
        'UPDATE "user" SET first_name = $1, last_name = $2, email = $3, password = $4, phone = $5 WHERE user_id = $6 RETURNING *',
        [firstName, lastName, email, password, phone, id]
      );
      return updatedUser.rows[0];
    } catch (err) {
      Logger.error(err.message);
      return err;
    }
  }

  async deleteById(id: string): Promise<TDeleteUser> {
    try {
      const isExistingUser = await isExistingDbProperty('user', 'user_id', id);

      if (!isExistingUser) throw new DBPropertyNotExistError('user_id');
      const removedUser = await dbConfig.query(
        'DELETE FROM "user" WHERE user_id = $1',
        [id]
      );
      return removedUser.rows[0];
    } catch (err) {
      Logger.error(err.message);
      return err;
    }
  }

  async getUserByEmailWithPassword(
    email: string
  ): Promise<IUserByEmailWithPassword> {
    try {
      const user = await dbConfig.query(
        'SELECT user_id, email, password FROM "user" WHERE email = $1',
        [email]
      );

      const { user_id } = user.rows[0];

      const userAccessRole = await dbConfig.query(
        'SELECT title FROM role WHERE role_id = (SELECT role_id FROM user_role WHERE user_id = $1)',
        [user_id]
      );

      return { ...user.rows[0], accessRole: userAccessRole.rows[0].title };
    } catch (err) {
      Logger.error(err.message);
    }
  }
}

export default new UsersServices();
