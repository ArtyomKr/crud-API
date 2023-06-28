import { IncomingMessage, ServerResponse, request } from 'http';
import handleError from '../endpoints/errorHandler.js';

const createLoadBalancer = function (serverList: string[]) {
  let index = 0;
  return async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url, headers } = req;

    const target = serverList[index];
    index = (index + 1) % serverList.length;

    const workerReq = request(
      target + url,
      { method, headers },
      (workerRes) => {
        res.writeHead(workerRes.statusCode ?? 200, workerRes.headers);
        workerRes.pipe(res);
      }
    );

    workerReq.on('error', (err) => {
      handleError(res, err);
    });

    req.pipe(workerReq);
    console.log('\x1b[36m%s\x1b[0m', 'Sending request to: ' + target);
  };
};

export default createLoadBalancer;
