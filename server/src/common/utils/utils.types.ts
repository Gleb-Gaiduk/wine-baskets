import { IDefaultGetQueryParams } from '../types/crud.interface';

export type TGetEndpointParamsReturn<TCustomDefaultParams> =
  IDefaultGetQueryParams & TCustomDefaultParams;
