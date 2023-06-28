interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface IDb {
  users: IUser[];
}

interface IClusterMessage {
  action: string;
  payload?: IUser[];
}

export type { IUser, IDb, IClusterMessage };
