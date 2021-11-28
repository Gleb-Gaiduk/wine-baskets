export interface IDefaultGetQueryParams {
  page: number;
  limit: number;
  qString: string;
}

export interface CRUD<TGetAll, TGetById, TCreate, TDeleteById, TPutById> {
  getAll?: (
    basicQueryParams,
    specificQueryParams: { [key: string]: unknown } | null
  ) => Promise<TGetAll>;
  getById?: (id: string) => Promise<TGetById>;
  create?: (resourse: unknown) => Promise<TCreate>;
  deleteById?: (id: string) => Promise<TDeleteById>;
  putById?: (id: string, resource: unknown) => Promise<TPutById>;
}
