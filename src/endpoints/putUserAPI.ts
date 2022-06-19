import { IncomingMessage, ServerResponse } from "http";
import updateUser from "../opr/updateUser.js";
import readReqBody from "../utils/readReqBody.js";
import handleError from "./errorHandler.js";

export default async function putUserAPI(
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) {
  try {
    const data = await readReqBody(req);
    const { code, body } = updateUser(id, data);

    res.statusCode = code;
    res.write(JSON.stringify(body));
  } catch (err) {
    handleError(res, err);
  }
}
