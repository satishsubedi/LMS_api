import { getSession } from "../models/session/sessionModel.js";
import { getOneUser, getUserByEmail } from "../models/user/userModel.js";
import {
  createAccessJwt,
  verifyAcceessJWT,
  verifyRefreshJWT,
} from "../utils/jwt.js";
import { responseClient } from "./responseClient.js";

export const userAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = "Unauthorized";
  if (authorization) {
    const token = authorization.split(" ")[1];
    //check if valid
    const decode = verifyAcceessJWT(token);
    if (decode.email) {
      //check if exist in session table
      const sessionToken = await getSession({ token });
      if (sessionToken?._id) {
        const email = sessionToken.association;
        // get user by email
        const user = await getUserByEmail({ email });
        // return the user
        if (user?._id && user.status === "active") {
          req.userInfo = user;
          return next();
        }
      }
    }
    message = decode;
  }
  // message = decode === "jwt expired" ? decode : "Unauthorized";
  responseClient({ req, res, message, statusCode: 401 });
};

export const renewaccessJWTMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  // let message = "Unauthorized";
  if (authorization) {
    const token = authorization.split(" ")[1];
    //check if valid
    const decode = verifyRefreshJWT(token);
    if (decode.email) {
      //check if exist in session table
      const user = await getOneUser(
        { email: decode.email },
        { refreshJWT: token }
      );
      if (user?._id) {
        // generate new access token
        const renewdaccesstoken = await createAccessJwt(user?.email);
        return responseClient({
          req,
          res,
          message: "here is the new access token",
          payload: renewdaccesstoken,
        });
      }
    }
  }
  // message = decode === "jwt expired" ? decode : "Unauthorized";
  responseClient({ req, res, message, statusCode: 401 });
};
