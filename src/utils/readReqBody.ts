import { IncomingMessage } from "http";

export default async function readReqBody(req: IncomingMessage) {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return JSON.parse(Buffer.concat(buffers).toString());
}
