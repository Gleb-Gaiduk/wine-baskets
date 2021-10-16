import { TAccessRole } from '@srcPath/domains/roles/interfaces/roles.interface';
import { TTokens } from './../../token/interfaces/token.interfaces';
import { IUserFromDB, IUserTokenPayload } from './../interfaces/user.interface';

export class UserTokenDTO implements IUserTokenPayload {
  id: number;
  email: string;
  isActivated: boolean;
  accessRole: TAccessRole;

  constructor(model) {
    (this.id = model.user_id),
      (this.email = model.email),
      (this.isActivated = model.is_activated);
    this.accessRole = model.accessRole;
  }
}

export class UserFromDbDTO extends UserTokenDTO implements IUserFromDB {
  firstName: string;
  lastName: string;
  phone: string;
  createdOn: string;
  activationLink: string;
  tokens: TTokens;
  accessRole: TAccessRole;

  constructor(model) {
    super(model);

    this.firstName = model.first_name;
    this.lastName = model.last_name;
    this.phone = model.phone;
    this.createdOn = model.created_on;
    this.activationLink = model.activation_link;
    this.accessRole = model.accessRole;
    this.tokens = {
      accessToken: model.accessToken,
      refreshToken: model.refreshToken,
    };
  }
}
