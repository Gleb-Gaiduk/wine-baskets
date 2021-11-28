import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import transform from 'lodash/transform';

export function getDifferenceBetweenObjects<Type, TypeBase>(
  object: Type,
  base: TypeBase
): { [key: string]: string | number } {
  const changes = (object, base) => {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  };
  return changes(object, base);
}

export function getDbQueryParamsString(
  paramsNumber: number,
  startParamNumber: number = 1
): string {
  let paramsString = '';
  const endParamsNumber =
    startParamNumber === 1 ? paramsNumber + 1 : paramsNumber + startParamNumber;

  for (let i = startParamNumber; i < endParamsNumber; i++) {
    if (i === endParamsNumber - 1) {
      paramsString += `$${i}`;
    } else {
      paramsString += `$${i},`;
    }
  }

  return ` (${paramsString}) `;
}

export function getIdsFromDbResponse(
  dbResponse: Array<{ id: number; [key: string]: unknown }>
): number[] | [] {
  const hasNoObjectWithId = dbResponse.some(
    responseObject => responseObject.id === undefined
  );

  if (hasNoObjectWithId) return [];
  return dbResponse.map(item => item.id);
}
