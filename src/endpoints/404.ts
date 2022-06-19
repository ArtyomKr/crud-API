import { ServerResponse } from "http";

export default function unknownPath(res: ServerResponse) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 404;
  res.write('Content not found');
}
