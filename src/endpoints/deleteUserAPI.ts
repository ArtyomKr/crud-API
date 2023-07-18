import { ServerResponse } from 'http';
import deleteUser from '../opr/deleteUser.js';
import handleError from './errorHandler.js';

export default async function deleteUserAPI(res: ServerResponse, id: string) {
  try {
    const { code, body } = await deleteUser(id);
    res.statusCode = code;
    res.write(JSON.stringify(body));
  } catch (err) {
    handleError(res, err);
  }
}
