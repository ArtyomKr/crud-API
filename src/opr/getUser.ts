import checkUUID from "../utils/checkUUID.js";
import getUserById from "../utils/getUserById.js";

export default function getUser(id: string) {
  if (!checkUUID(id)) return { code: 400, body: 'Invalid id' };
  const user = getUserById(id);
  if (!user) return { code: 404, body: 'User not found' };
  return { code: 200, body: user };
}
