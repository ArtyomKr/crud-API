import { ServerResponse } from 'http';
import getUser from '../opr/getUser.js';
import handleError from './errorHandler.js';

export default async function getUserByIdAPI(res: ServerResponse, id: string) {
  try {
    const { code, body } = await getUser(id);
    res.statusCode = code;
    res.write(JSON.stringify(body));
  } catch (err) {
    handleError(res, err);
  }
}
