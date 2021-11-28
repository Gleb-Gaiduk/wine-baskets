import { IDefaultGetQueryParams } from '../types/crud.interface';
import { TGetEndpointParamsReturn } from './utils.types';

export const getQueryParams = <TAllQueryParams>(
  defaultCustomQueryParams: { [key: string]: string | number | boolean },
  allQueryParams: TAllQueryParams
): TGetEndpointParamsReturn<typeof defaultCustomQueryParams> => {
  const getQueryParams: IDefaultGetQueryParams &
    typeof defaultCustomQueryParams = Object.assign(
    {
      page: 1,
      limit: 10,
      qString: '',
    },
    defaultCustomQueryParams
  );

  for (const [key, value] of Object.entries(allQueryParams)) {
    const isPropertyExistsInInitialParams = getQueryParams[key] !== undefined;

    if (isPropertyExistsInInitialParams) {
      Number(value)
        ? (getQueryParams[key] = Number(value))
        : (getQueryParams[key] = String(value));
    } else {
      getQueryParams[key] = value;
    }
  }

  return getQueryParams;
};
