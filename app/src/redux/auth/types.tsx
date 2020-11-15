export type AuthState = {
  logged: boolean,
  username: string,
  jwt: string
};

export type AuthAction = {
  type: string,
  payload?: AuthState
};

export type AuthDispatch = (action: AuthAction) => void;