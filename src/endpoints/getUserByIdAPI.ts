import { ServerResponse } from "http";
import getUser from "../opr/getUser.js";
import handleError from "./errorHandler.js";

export default function getUserByIdAPI(res: ServerResponse, id: string) {
  try {
    const { code, body } = getUser(id);
    res.statusCode = code;
    res.write(JSON.stringify(body));
  } catch (err) {
    handleError(res, err);
  }
}
