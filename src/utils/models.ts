interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

interface IDb {
  users: IUser[];
}

export type { IUser, IDb };
