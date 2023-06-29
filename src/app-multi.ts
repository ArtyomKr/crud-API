import cluster from 'cluster';
import os from 'os';
import 'dotenv/config';
import { createServer } from 'http';
import requestListener from './handlers/requestListener.js';
import createLoadBalancer from './handlers/loadBalancer.js';
import { getUsersDB, setUsersDB } from './db/usersDB.js';
import { IClusterMessage } from './utils/models';

const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || 'http://localhost';

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  const workerAddressPool = [];

  for (let i = 1; i < numCPUs; i++) {
    const workerPort = +port + i;
    workerAddressPool.push(`${origin}:${workerPort}`);

    const worker = cluster.fork({ PORT: workerPort });

    worker.on('message', (message: IClusterMessage) => {
      if (message.action === 'updateDB' && message.payload)
        setUsersDB(message.payload);
      if (message.action === 'sendDB')
        worker.send({ action: 'receiveDB', payload: getUsersDB() });
    });
  }
  const loadBalancer = createServer(createLoadBalancer(workerAddressPool));

  loadBalancer.listen(port, () => {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `Load balancer running at ${origin}:${port}/`
    );
  });

  process.on('SIGINT', () => {
    loadBalancer.close();
  });
} else {
  const server = createServer(requestListener);

  server.listen(port, () => {
    console.log(`Worker running at ${origin}:${port}/`);
  });

  process.on('message', (message: IClusterMessage) => {
    if (message.action === 'syncDB' && message.payload) {
      setUsersDB(message.payload);
    }
  });

  process.on('SIGINT', () => {
    server.close();
  });
}
