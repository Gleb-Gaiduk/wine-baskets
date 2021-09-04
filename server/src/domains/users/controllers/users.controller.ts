import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';
import { Request, Response } from 'express';
import usersService from '../services/users.service';
class UsersController {
  async getUsers(req: Request, res: Response) {
    const usersList = await usersService.getAll();
    res.status(200).json(usersList);
  }

  async postUsers(req: Request, res: Response) {
    const newUser = await usersService.create(req.body);
    res.status(201).json(newUser);
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
