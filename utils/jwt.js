import jwt from "jsonwebtoken";
import { token } from "morgan";
import { createNewSession } from "../models/session/sessionModel.js";
import { updateUser } from "../models/user/userModel.js";
// generate accessJWT
export const createAccessJwt = async (email) => {
  const accessJWT = jwt.sign({ email }, process.env.ACCESSJWTTOKENSECRETKEY, {
    expiresIn: "15min",
  });
  const obj = {
    token: accessJWT,
    association: email,
    expire: new Date(Date.now() + 15 * 60 * 1000), //15min
  };
  const newSession = await createNewSession(obj);
  console.log(newSession);
  return newSession?._id ? accessJWT : null;
};

// decode accessJWT

export const verifyAcceessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESSJWTTOKENSECRETKEY);
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

// generate refreshJWT
export const createRefresjJwt = async (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWTTOKENSECRETKEY, {
    expiresIn: "30d",
  });
  const user = await updateUser({ email }, { refreshJWT });

  return user?._id ? refreshJWT : null;
};

//verify refreshJWY
export const verifyRefreshJWT = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESHJWTTOKENSECRETKEY);
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const getJwts = async (email) => {
  const obj = {
    accessJWT: await createAccessJwt(email),
    refreshJWT: await createRefresjJwt(email),
  };
  return obj;
};
