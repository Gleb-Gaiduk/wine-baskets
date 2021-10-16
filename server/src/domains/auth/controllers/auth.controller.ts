import { NextFunction, Request, Response } from 'express';
import authServices from '../services/auth.services';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await authServices.login(req.body);
      res.cookie('refreshToken', userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await authServices.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authServices.refreshToken(refreshToken);
      res.cookie('refreshToken', userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).json(userData);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
