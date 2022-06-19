import { get, IncomingMessage, request } from "http";
import "dotenv/config";

const testData = {
  username: 'testName',
  age: 10,
  hobbies: []
};

let userId: string;

describe('API testing', () => {
  test('get all users from api/users', (done) => {
    let response = '';
    get(
      `http://localhost:${process.env.PORT}/api/users`,
      (res: IncomingMessage) => {
        res.on('data', (chunk: string) => (response += chunk));
        res.on('error', (err: Error) => done(err));
        res.on('end', () => {
          done();
          expect(JSON.parse(response)).toEqual([]);
        });
      }
    );
  });

  test('create user using api/users', (done) => {
    const options = {
      hostname: 'localhost',
      port: process.env.PORT,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let response = '';
    const req = request(options, (res: IncomingMessage) => {
      res.on('data', (chunk: string) => (response += chunk));
      res.on('error', (err: Error) => done(err));
      res.on('end', () => {
        done();
        const parsed = JSON.parse(response);
        userId = parsed.id;
        expect(parsed).toMatchObject(testData);
      });
    });

    req.on('error', (err) => done(err));
    req.write(JSON.stringify(testData));
    req.end();
  });

  test('get created user by id from api/users/:id', (done) => {
    let response = '';
    get(
      `http://localhost:${process.env.PORT}/api/users/${userId}`,
      (res: IncomingMessage) => {
        res.on('data', (chunk: string) => (response += chunk));
        res.on('error', (err: Error) => done(err));
        res.on('end', () => {
          done();
          expect(JSON.parse(response)).toMatchObject(testData);
        });
      }
    );
  });
});
