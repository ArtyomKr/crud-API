import { IncomingMessage, ServerResponse, request } from 'http';
import handleError from '../endpoints/errorHandler.js';
import readReqBody from '../utils/readReqBody.js';

const createLoadBalancer = function (serverList: string[]) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url, headers} = req;
    //const data = await readReqBody(req);
    const reqURL = req.url?.match(/(?<=\/)[^\/]+/g) || [];
    res.setHeader("Content-Type", "application/json");

    try {
      const workerReq = request(`${serverList[0]}${url}`, { method, headers});
      workerReq.on("response", (workerRes) => {
        console.log(workerRes);
        res.write(workerRes);
      });
    } catch (err) {
      handleError(res, err);
    }

    res.end();
  };
};

export default createLoadBalancer;
