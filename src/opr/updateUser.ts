import { getUsersDB, setUsersDB } from "../db/usersDB.js";
import { IUser } from "../utils/models.js";
import checkUUID from "../utils/checkUUID.js";
import getUserById from "../utils/getUserById.js";
import isUserObj from "../utils/userTypeGuard.js";

export default function updateUser(id: string, updatedData: Omit<IUser, 'id'>) {
  if (!checkUUID(id)) return { code: 400, body: 'Invalid id' };
  if (!getUserById(id)) return { code: 404, body: 'User not found' };
  if (!isUserObj(updatedData))
    return { code: 400, body: 'Invalid request body' };
  const updatedUser = { id, ...updatedData };
  const users = getUsersDB().map((user) =>
    user.id === id ? updatedUser : user
  );
  setUsersDB(users);
  return { code: 200, body: updatedUser };
}
