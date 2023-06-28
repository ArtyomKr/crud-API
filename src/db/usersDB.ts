import { IClusterMessage, IDb, IUser } from '../utils/models';
import cluster from 'cluster';

const db: IDb = {
  users: []
};

function setUsersDB(arr: IUser[]) {
  if (cluster.isWorker && process.send) {
    process.send({ action: 'updateDB', payload: arr });
  } else db.users = arr;
  return db.users;
}

function getUsersDB() {
  if (cluster.isWorker && process.send) {
    return new Promise<IUser[]>((res) => {
      process.send?.({ action: 'sendDB' });
      process.on('message', (message: IClusterMessage) => {
        if (message.action === 'receiveDB' && message.payload) {
          res(message.payload);
        }
      });
    });
  }
  return db.users.slice();
}

export { getUsersDB, setUsersDB };
