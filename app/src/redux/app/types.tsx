export type AppState = {
  gitCommit: {
    shortHash: string,
    committer: {
      name: string,
      email: string
    },
    branch: string
  }
};

export type AppAction = {
  type: string,
  payload?: AppState
};

export type AppDispatch = (action: AppAction) => void;