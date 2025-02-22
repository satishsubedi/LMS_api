import Joi from "joi";

export const FNAME = Joi.string().alphanum().min(4).max(15);
export const FNAMEREQ = FNAME.required();

export const LNAME = Joi.string().alphanum().min(4).max(15);
export const LNAMEREQ = LNAME.required();

export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAILREQ = EMAIL.required();

export const PASSWORDREQ = Joi.string().required();

export const PHONE = Joi.string().max(10).min(10);
export const PHONEREQ = PHONE.required();

export const SESSIONID = Joi.string().alphanum();
export const SESSIONIDREQ = SESSIONID.required();

export const TOKEN = Joi.string();
export const TOKENREQ = TOKEN.required();

export const OTP = Joi.number().required();
