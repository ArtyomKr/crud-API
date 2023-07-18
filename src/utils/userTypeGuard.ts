import { IUser } from './models.js';

export default function isUserObj(obj: unknown): obj is Omit<IUser, 'id'> {
  if (
    typeof obj === 'object' &&
    obj &&
    'username' in obj &&
    'age' in obj &&
    'hobbies' in obj
  ) {
    return (
      typeof obj['username'] === 'string' &&
      typeof obj['age'] === 'number' &&
      Array.isArray(obj['hobbies'])
    );
  }
  return false;
}
