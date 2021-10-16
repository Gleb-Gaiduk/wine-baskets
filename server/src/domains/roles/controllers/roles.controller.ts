import { Request, Response } from 'express';
import rolesService from '../services/roles.service';
class RolesController {
  async getRoles(req: Request, res: Response) {
    const accessRoles = await rolesService.getAll();
    res.status(200).json(accessRoles);
  }

  async createRole(req: Request, res: Response) {
    const accessRole = await rolesService.create(req.body);
    res.status(201).json(accessRole);
  }
}

export default new RolesController();
