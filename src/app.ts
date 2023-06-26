import { createServer } from 'http';
import 'dotenv/config';
import requestListener from './handlers/requestListener.js';

const port = process.env.PORT || 3000;

const server = createServer(requestListener);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
