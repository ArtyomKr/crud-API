import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';
import { createServer } from 'http';
import requestListener from './handlers/requestListener.js';
import createLoadBalancer from './handlers/loadBalancer.js';

const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || "http://localhost";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  const workerAdressPool = [];

  for (let i = 1; i < numCPUs; i++) {
    const workerPort = +port + i;
    workerAdressPool.push(`${origin}:${workerPort}`);

    cluster.fork({ PORT: workerPort });
  }

  const loadBalancer = createServer(createLoadBalancer(workerAdressPool));

  loadBalancer.listen(port, () => {
    console.log(`Load balancer running at ${origin}:${port}/`);
  });
} else {
  const server = createServer(requestListener);

  server.listen(port, () => {
    console.log(`Worker running at ${origin}:${port}/`);
  });
}
