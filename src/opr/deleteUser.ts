import { getUsersDB, setUsersDB } from "../db/usersDB.js";
import checkUUID from "../utils/checkUUID.js";
import getUserById from "../utils/getUserById.js";

export default function deleteUser(id: string) {
  if (!checkUUID(id)) return { code: 400, body: 'Invalid id' };
  if (!getUserById(id)) return { code: 404, body: 'User not found' };
  const users = getUsersDB().filter((user) => user.id !== id);
  setUsersDB(users);
  return { code: 204, body: '' };
}
