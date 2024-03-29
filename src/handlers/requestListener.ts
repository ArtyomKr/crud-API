import { IncomingMessage, ServerResponse } from 'http';
import getUsersAPI from '../endpoints/getUsersAPI.js';
import getUserByIdAPI from '../endpoints/getUserByIdAPI.js';
import createUserAPI from '../endpoints/createUserAPI.js';
import putUserAPI from '../endpoints/putUserAPI.js';
import deleteUserAPI from '../endpoints/deleteUserAPI.js';
import unknownPath from '../endpoints/404.js';

const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  const reqURL = req.url?.match(/(?<=\/)[^\/]+/g) || [];
  res.setHeader('Content-Type', 'application/json');

  if (
    reqURL[0] === 'api' &&
    reqURL[1] === 'users' &&
    reqURL.length === 2 &&
    req.method === 'GET'
  ) {
    await getUsersAPI(res);
  } else if (
    reqURL[0] === 'api' &&
    reqURL[1] === 'users' &&
    reqURL.length === 3 &&
    req.method === 'GET'
  ) {
    await getUserByIdAPI(res, reqURL[2]);
  } else if (
    reqURL[0] === 'api' &&
    reqURL[1] === 'users' &&
    reqURL.length === 2 &&
    req.method === 'POST'
  ) {
    await createUserAPI(req, res);
  } else if (
    reqURL[0] === 'api' &&
    reqURL[1] === 'users' &&
    reqURL.length === 3 &&
    req.method === 'PUT'
  ) {
    await putUserAPI(req, res, reqURL[2]);
  } else if (
    reqURL[0] === 'api' &&
    reqURL[1] === 'users' &&
    reqURL.length === 3 &&
    req.method === 'DELETE'
  ) {
    deleteUserAPI(res, reqURL[2]);
  } else {
    unknownPath(res);
  }

  res.end();
};

export default requestListener;
