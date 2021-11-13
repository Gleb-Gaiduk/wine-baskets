import config from '@srcPath/common/config';
import dbConfig from '@srcPath/common/db/db.config';
import { IUserTokenPayload } from '@srcPath/domains/users/user.interface';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';

class TokenServices {
  generateToken(payload): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(payload, config.token.accessSecret, {
      expiresIn: config.token.accessExpirationInSeconds,
    });

    const refreshToken = jwt.sign(payload, config.token.refreshSecret, {
      expiresIn: config.token.refreshExpirationInSeconds,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokenToDB(userId, refreshToken) {
    const tokenDataFromDB = await dbConfig.query(
      'SELECT * FROM token WHERE user_id = $1',
      [userId]
    );

    const tokenData = tokenDataFromDB.rows[0];

    if (!isEmpty(tokenData)) {
      const updatedTokenData = await dbConfig.query(
        'UPDATE token SET refresh_token = $1 WHERE user_id = $2 RETURNING *',
        [refreshToken, userId]
      );
      return updatedTokenData.rows[0];
    }

    // First login
    const token = await dbConfig.query(
      'INSERT INTO token (user_id, refresh_token) VALUES ($1, $2) RETURNING *',
      [userId, refreshToken]
    );

    return token.rows[0];
  }

  async removeToken(refreshToken: string) {
    await dbConfig.query('DELETE FROM token WHERE refresh_token = $1', [
      refreshToken,
    ]);
  }

  validateAccessToken(token: string): IUserTokenPayload | null {
    try {
      const userData = jwt.verify(token, config.token.accessSecret);
      return userData as IUserTokenPayload;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token: string): IUserTokenPayload | null {
    try {
      const userData = jwt.verify(token, config.token.refreshSecret);
      return userData as IUserTokenPayload;
    } catch (err) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    const tokenData = await dbConfig.query(
      'SELECT * FROM token WHERE refresh_token = $1',
      [refreshToken]
    );
    return tokenData.rows[0];
  }
}

export default new TokenServices();
