export interface AdminUser {
  readonly email: string;
  readonly siteAdmin: boolean;
}

export type AdminState = {
  users: Array<AdminUser>
};

export type AdminAction = {
  type: string,
  payload?: AdminState
};

export type AdminDispatch = (action: AdminAction) => void;