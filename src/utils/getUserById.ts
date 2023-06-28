import { getUsersDB } from '../db/usersDB.js';

export default async function getUserById(id: string) {
  return (await getUsersDB()).find((user) => user.id === id);
}
