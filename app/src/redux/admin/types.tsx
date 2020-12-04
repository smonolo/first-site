export interface AdminUser {
  readonly username: string;
  readonly email: string;
  readonly siteAdmin: boolean;
  readonly banned: boolean;
}

export type AdminState = {
  users: Array<AdminUser>
};

export type AdminAction = {
  type: string,
  payload?: AdminState
};

export type AdminDispatch = (action: AdminAction) => void;