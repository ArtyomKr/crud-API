import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';
import { createServer } from 'http';
import requestListener from './handlers/requestListener.js';

const port = process.env.PORT || 3000;

// @ts-ignore (for Node versions < 18.14.0)
const numCPUs = os.availableParallelism ?? os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 1; i < numCPUs; i++) {
    cluster.fork({ PORT: +port + i });
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = createServer(requestListener);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  console.log(port);
}
