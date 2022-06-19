import { getUsersDB } from "../db/usersDB.js";
import { ServerResponse } from "http";
import handleError from "./errorHandler.js";

export default function getUsersAPI(res: ServerResponse) {
  try {
    res.statusCode = 200;
    res.write(JSON.stringify(getUsersDB()));
  } catch (err) {
    handleError(res, err);
  }
}
