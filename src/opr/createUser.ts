import { randomUUID } from 'crypto';
import { IUser } from '../utils/models.js';
import { getUsersDB, setUsersDB } from '../db/usersDB.js';
import isUserObj from '../utils/userTypeGuard.js';

export default async function createUser(user: Omit<IUser, 'id'>) {
  if (!isUserObj(user)) return { code: 400, body: 'Invalid request body' };
  const newUser = { id: randomUUID(), ...user };
  const users = await getUsersDB();
  users.push(newUser);
  setUsersDB(users);
  return { code: 201, body: newUser };
}
