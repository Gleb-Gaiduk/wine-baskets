import config from '@srcPath/common/config';
import { NextFunction, Request, Response } from 'express';
import usersService from './services/users.service';
class UsersController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    const limit: number = req.query.limit ? +req.query.limit : 10;
    const page: number = req.query.page ? +req.query.page : 1;

    try {
      const usersList = await usersService.getAll(limit, page);
      res.status(200).json(usersList);
    } catch (err) {
      next(err);
    }
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

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.getById(req.params.userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await usersService.putById(
        req.params.userId,
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const removedUser = await usersService.deleteById(req.params.userId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
}

export default new UsersController();
