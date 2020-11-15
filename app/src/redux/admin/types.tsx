export type AdminState = {
  users: Array<string>
};

export type AdminAction = {
  type: string,
  payload?: AdminState
};

export type AdminDispatch = (action: AdminAction) => void;