export type GitCommit = {
  shortHash: string,
  hash: string,
  subject: string,
  committedOn: string,
  committer: {
    name: string,
    email: string
  },
  branch: string
}

export type AppState = {
  gitCommit: GitCommit
};

export type AppAction = {
  type: string,
  payload?: AppState
};

export type AppDispatch = (action: AppAction) => void;