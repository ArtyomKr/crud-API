import { getUsersDB } from "../db/usersDB.js";

export default function getUserById(id: string) {
  return getUsersDB().find((user) => user.id === id);
}
