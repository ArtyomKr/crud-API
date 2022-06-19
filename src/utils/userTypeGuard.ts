import { IUser } from "./models.js";

export default function isUserObj(obj: any): obj is Omit<IUser, 'id'> {
  if ('username' in obj && 'age' in obj && 'hobbies' in obj) {
    return (
      typeof obj['username'] === 'string' &&
      typeof obj['age'] === 'number' &&
      Array.isArray(obj['hobbies'])
    );
  }
  return false;
}
