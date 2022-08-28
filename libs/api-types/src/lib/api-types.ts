/**
 *
 */
export interface IMessage {
  message: string;
}

/**
 * Models a typical Login/Register route return body
 */
export interface IJWTResponseBody {
  /**
   * When the token is to expire in seconds
   */
  expiresIn: number;
  /**
   * A human-readable format of expires
   */
  expiresInFormatted: string;
  /**
   * The Bearer token
   */
  token: string;
}

/**
 * Models a typical response for a crud operation
 */
export interface IGenericMessageBody {
  /**
   * Status message to return
   */
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
  gravatar: string;
  roles: {
    role: UserRolesEnum;
  }[];
  name: string;
  authenticated: boolean;
}
