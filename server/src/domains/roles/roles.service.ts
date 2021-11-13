import dbConfig from '@srcPath/common/db/db.config';
import { logErrorWithFilePath } from '@srcPath/common/loaders/logger.loader';
import {
  IAccessRoleFromClient,
  TAccessRole,
  TCreateRole,
  TGetRoles,
} from './roles.interface';

class RolesService {
  async getAll(): Promise<TGetRoles> {
    try {
      const accessRoles = await dbConfig.query('SELECT * FROM role');
      return accessRoles.rows;
    } catch (err) {
      logErrorWithFilePath(err);
    }
  }

  async create({
    title,
    description,
  }: IAccessRoleFromClient): Promise<TCreateRole> {
    try {
      const newRole = await dbConfig.query(
        'INSERT INTO role (title, description) VALUES ($1, $2) RETURNING *',
        [title, description]
      );
      return newRole.rows[0];
    } catch (err) {
      logErrorWithFilePath(err);
    }
  }

  async addRoleToUser(userId: number, roleName: TAccessRole) {
    try {
      const newUserWithRoleRecord = await dbConfig.query(
        'INSERT INTO user_role (user_id, role_id) VALUES ($1, (SELECT role_id FROM role WHERE title = $2)) RETURNING *',
        [userId, roleName]
      );

      return newUserWithRoleRecord.rows[0];
    } catch (err) {
      logErrorWithFilePath(err);
    }
  }
}

export default new RolesService();
