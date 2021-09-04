import config from '@srcPath/common/config';
import Logger from '@srcPath/common/loaders/logger.loader';
import { Pool } from 'pg';

class dbConfig {
  static pool: Pool = new Pool({
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
  });

  public async query(sqlQuery: string, params: Array<unknown> | null = null) {
    const startTimePoint = Date.now();
    const result = await dbConfig.pool.query(sqlQuery, params);
    const queryDuration = Date.now() - startTimePoint;

    Logger.info(
      `✌️ Executed database query: ${JSON.stringify({
        sqlQuery,
        queryDuration,
        rows: result.rowCount,
      })}`
    );

    return result;
  }
}

export default new dbConfig();
