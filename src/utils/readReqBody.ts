import { IncomingMessage } from 'http';

export default async function readReqBody(req: IncomingMessage) {
  const contentLength = req.headers['content-length'];
  if (contentLength && +contentLength > 0) {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }

    return JSON.parse(Buffer.concat(buffers).toString() ?? '');
  } else return null;
}
