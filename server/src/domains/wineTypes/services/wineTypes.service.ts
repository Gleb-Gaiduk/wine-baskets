import dbConfig from '@srcPath/common/db/db.config';
import { isExistingDbProperty } from '@srcPath/common/db/db.utils';
import { DBPropertyNotExistError } from '@srcPath/common/errors/DBValidation.error';
import Logger from '@srcPath/common/loaders/logger.loader';
import { CRUD } from '@srcPath/domains/wineTypes/interfaces/crud.interface';
import {
  ICreateWineType,
  TCreateWineType,
  TDeleteWineType,
  TGetWineTypeById,
  TGetWineTypes,
  TPutWineType,
} from '@srcPath/domains/wineTypes/interfaces/wineType.interface';

class WineTypesService
  implements
    CRUD<
      TGetWineTypes,
      TGetWineTypeById,
      TCreateWineType,
      TDeleteWineType,
      TPutWineType
    >
{
  async getAll(limit: number, page: number): Promise<TGetWineTypes> {
    try {
      const wineTypes = await dbConfig.query('SELECT * FROM wine_type');
      return wineTypes.rows;
    } catch (err) {
      Logger.error(err);
    }
  }

  async getById(id: string): Promise<TGetWineTypeById> {
    try {
      const isExistingTypeRecord = await isExistingDbProperty(
        'wine_type',
        'wine_type_id',
        id
      );

      if (!isExistingTypeRecord) {
        throw new DBPropertyNotExistError('wine_type_id');
      } else {
        const wineType = await dbConfig.query(
          'SELECT * FROM wine_type WHERE wine_type_id = $1',
          [id]
        );
        return wineType.rows[0];
      }
    } catch (err) {
      Logger.error(err.message);
      return err;
    }
  }

  async getByType(
    type: string
  ): Promise<TGetWineTypeById | DBPropertyNotExistError> {
    try {
      const wineType = await dbConfig.query(
        'SELECT type FROM wine_type WHERE type = $1',
        [type]
      );
      return wineType.rows[0];
    } catch (err) {
      Logger.error(err);
    }
  }

  async create({ type }: ICreateWineType): Promise<TCreateWineType> {
    try {
      const newWineType = await dbConfig.query(
        'INSERT INTO wine_type (type) values ($1) RETURNING *',
        [type]
      );
      return newWineType.rows[0];
    } catch (err) {
      Logger.error(err);
    }
  }

  async deleteById(id: string): Promise<TDeleteWineType> {
    try {
      const isExistingTypeRecord = await isExistingDbProperty(
        'wine_type',
        'wine_type_id',
        id
      );

      if (!isExistingTypeRecord) {
        throw new DBPropertyNotExistError('wine_type_id');
      } else {
        const removedWineType = await dbConfig.query(
          'DELETE FROM wine_type WHERE wine_type_id = $1',
          [id]
        );

        return removedWineType.rows[0];
      }
    } catch (err) {
      Logger.error(err.message);
      return err;
    }
  }

  async putById(id: string, { type }: ICreateWineType): Promise<TPutWineType> {
    try {
      const isExistingTypeRecord = await isExistingDbProperty(
        'wine_type',
        'wine_type_id',
        id
      );

      if (!isExistingTypeRecord) {
      } else {
        const updateWineType = await dbConfig.query(
          'UPDATE wine_type SET "type" = $2 WHERE wine_type_id = $1 RETURNING *',
          [id, type]
        );
        return updateWineType.rows[0];
      }
    } catch (err) {
      Logger.error(err.message);
      return err;
    }
  }
}

export default new WineTypesService();
