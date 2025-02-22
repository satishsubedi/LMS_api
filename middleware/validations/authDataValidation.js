import {
  EMAILREQ,
  FNAMEREQ,
  LNAMEREQ,
  OTP,
  PASSWORDREQ,
  PHONE,
  SESSIONIDREQ,
  TOKENREQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";
import Joi from "joi";

export const validateSignUpData = (req, res, next) => {
  const obj = {
    fName: FNAMEREQ,
    lName: LNAMEREQ,
    email: EMAILREQ,
    password: PASSWORDREQ,
    phone: PHONE,
  };
  return validateData({ req, res, next, obj });
};

export const validateSessionData = (req, res, next) => {
  const obj = {
    sessionid: SESSIONIDREQ,
    t: TOKENREQ,
  };
  return validateData({ req, res, next, obj });
};

export const validateLoginData = (req, res, next) => {
  const obj = {
    email: EMAILREQ,
    password: PASSWORDREQ,
  };
  return validateData({ req, res, next, obj });
};

export const validateForgetpasswordData = (req, res, next) => {
  const obj = {
    email: EMAILREQ,
  };
  return validateData({ req, res, next, obj });
};

export const validateResetpasswordData = (req, res, next) => {
  const obj = {
    email: EMAILREQ,
    password: PASSWORDREQ,
    otp: OTP,
  };
  return validateData({ req, res, next, obj });
};
