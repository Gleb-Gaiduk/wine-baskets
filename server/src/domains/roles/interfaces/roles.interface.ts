export type TAccessRole =
  | 'admin'
  | 'customer'
  | 'deliveryPerson'
  | 'salesPerson';

export interface IAccessRoleFromClient {
  title: TAccessRole;
  description: string;
}

export interface IAccessRoleFromDB {
  role_id: number;
}

export type TGetRoles = Array<IAccessRoleFromDB>;
export type TCreateRole = IAccessRoleFromDB;
