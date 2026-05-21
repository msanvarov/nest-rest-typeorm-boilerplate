export interface IMessage {
  message: string;
}

export interface IJWTResponseBody {
  expiration: number;
  expirationFormatted: string;
  token: string;
}

export interface IGenericMessageBody {
  message: string;
}

export enum UserRolesEnum {
  DEFAULT = 'DEFAULT',
  SUDO = 'SUDO',
}

export enum UserActionsEnum {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export interface IUser {
  username: string;
  gravatar?: string;
  roles?: { role: UserRolesEnum }[];
  name?: string;
  authenticated: boolean;
  token: string;
}

export interface IAuthRegisterPayload {
  email: string;
  username: string;
  name: string;
  password: string;
}
