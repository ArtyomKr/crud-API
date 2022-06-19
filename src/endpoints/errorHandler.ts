import { ServerResponse } from "http";

export default function handleError(res: ServerResponse, err: unknown) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 500;
  res.write((<Error>err).message ?? 'Unknown error occurred');
}
