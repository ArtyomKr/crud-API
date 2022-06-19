import { IDb, IUser } from "../utils/models";

const db: IDb = {
  users: []
};

function setUsersDB(arr: IUser[]) {
  db.users = arr;
  return db.users;
}

function getUsersDB() {
  return db.users.slice();
}

export { getUsersDB, setUsersDB };
