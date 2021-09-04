import dbConfig from './db.config';

export const isExistingDbProperty = async (
  tableName: string,
  propertyName: string,
  propertyValue: string | number
): Promise<boolean> => {
  const requestedProperty = await dbConfig.query(
    `SELECT EXISTS(SELECT 1 FROM "${tableName}" WHERE ${propertyName} = $1)`,
    [propertyValue]
  );
  console.log(requestedProperty);

  return requestedProperty.rows[0].exists;
};
