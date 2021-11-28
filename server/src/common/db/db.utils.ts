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

  return requestedProperty.rows[0].exists;
};

export const getTrimmedArrayWithProps = <
  T extends Array<{ [key: string]: string | number }>
>(
  propsArray: T
): T => {
  const trimmedArrayWithProperties = propsArray.map(item => {
    const arr = Object.entries(item);
    const resultObj = {};
    arr.forEach(elem => {
      resultObj[elem[0].trim()] = String(elem[1]).trim();
    });
    return resultObj;
  }) as T;

  return trimmedArrayWithProperties;
};
