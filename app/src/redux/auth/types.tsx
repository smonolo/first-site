export type AuthState = {
  logged: boolean,
  id: string,
  username: string,
  email: string,
  siteAdmin: boolean,
  jwt: string
};

export type AuthAction = {
  type: string,
  payload?: AuthState
};

export type AuthDispatch = (action: AuthAction) => void;

export interface LoginResponse {
  readonly success: boolean;
  readonly payload?: {
    readonly jwt: string;
    readonly id: string;
    readonly username: string;
    readonly email: string;
    readonly siteAdmin: boolean;
  };
}