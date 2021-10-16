import config from '@srcPath/common/config';
import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';
import { NextFunction, Request, Response } from 'express';
import usersService from '../services/users.service';
class UsersController {
  async getUsers(req: Request, res: Response) {
    const limit: number = req.query.limit ? +req.query.limit : 10;
    const page: number = req.query.page ? +req.query.page : 1;

    const usersList = await usersService.getAll(limit, page);
    res.status(200).json(usersList);
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await usersService.create(req.body);
      res.cookie('refreshToken', newUser.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  async activateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink: string = req.params.activationLink;
      await usersService.activateAccount(activationLink);
      res.status(301).redirect(config.api.clientUrl);
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req: Request, res: Response) {
    const user = await usersService.getById(req.params.userId);

    if (user instanceof DBPropertyNotExistError) {
      res.status(user.statusCode).json(user.getErrorObject());
    } else {
      res.status(200).json(user);
    }
  }
  async updateUserById(req: Request, res: Response) {
    const updatedUser = await usersService.putById(req.params.userId, req.body);

    if (updatedUser instanceof DBPropertyNotExistError) {
      res.status(updatedUser.statusCode).json(updatedUser.getErrorObject());
    } else {
      res.status(200).json(updatedUser);
    }
  }

  async deleteUserById(req: Request, res: Response) {
    const removedUser = await usersService.deleteById(req.params.userId);

    if (removedUser instanceof DBPropertyNotExistError) {
      res.status(removedUser.statusCode).json(removedUser.getErrorObject());
    } else {
      res.status(204).json({});
    }
  }
}

export default new UsersController();
