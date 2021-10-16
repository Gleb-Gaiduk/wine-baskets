export interface CRUD<TGetAll, TGetById, TCreate, TDeleteById, TPutById> {
  getAll: (limit: number, page: number) => Promise<TGetAll>;
  getById: (id: string) => Promise<TGetById>;
  create: (resourse: unknown) => Promise<TCreate>;
  deleteById: (id: string) => Promise<TDeleteById>;
  putById: (id: string, resource: unknown) => Promise<TPutById>;

  // patchById: (id: string, resource: any) => Promise<string>;
}
