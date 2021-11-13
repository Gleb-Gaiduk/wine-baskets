import dbConfig from '@srcPath/common/db/db.config';
import ApiError from '@srcPath/common/errors/api.error';
import tokenService from '@srcPath/domains/token/services/token.service';
import { UserFromDbDTO, UserTokenDTO } from '@srcPath/domains/users/user.dto';
import { IUserTokenPayload } from '@srcPath/domains/users/user.interface';
import bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';

class AuthServices {
  async login({ email, password }: { email: string; password: string }) {
    const user = await dbConfig.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    const userData = user.rows[0];

    if (isEmpty(userData))
      throw ApiError.BadRequest('User with such email was not found');

    const isPasswordEquals = await bcrypt.compare(password, userData.password);

    if (!isPasswordEquals)
      throw ApiError.BadRequest('Password or email is incorrect');

    const userRole = await dbConfig.query(
      'SELECT title FROM Role WHERE role_id IN (SELECT role_id FROM user_role WHERE user_id = $1)',
      [userData.user_id]
    );
    userData.accessRole = userRole.rows[0].title;

    const tokenDto = new UserTokenDTO(userData);
    const tokens = tokenService.generateToken({ ...tokenDto });
    await tokenService.saveTokenToDB(tokenDto.id, tokens.refreshToken);

    return new UserFromDbDTO({ ...userData, ...tokens });
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refreshToken(refreshToken: string) {
    // If a user doesn't have refresh token he is not authorized
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userDataFromToken: IUserTokenPayload =
      tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userDataFromToken || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const userDataFromDB = await dbConfig.query(
      'SELECT * FROM "user" WHERE user_id = $1',
      [userDataFromToken.id]
    );

    const tokenDto = new UserTokenDTO({ ...userDataFromDB.rows[0] });
    const tokens = tokenService.generateToken({ ...tokenDto });
    await tokenService.saveTokenToDB(tokenDto.id, tokens.refreshToken);

    return new UserFromDbDTO({ ...userDataFromDB, ...tokens });
  }
}

export default new AuthServices();
