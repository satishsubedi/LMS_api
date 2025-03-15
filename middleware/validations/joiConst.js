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

export const SHORT_STR = Joi.string().min(3).max(100);
export const SHORT_STR_REQ = SHORT_STR.required();

export const LONG_STR = Joi.string().min(1).max(1000).required();
export const LONG_STR_REQ = LONG_STR.required();

export const STR_ARRAY = Joi.array().items(Joi.string());
export const STR_ARRAY_REQ = STR_ARRAY.required();

export const ISBN_REQ = Joi.number().integer().required();
export const _ID_REQ = Joi.string().required();

export const STATUS = Joi.string().valid("active", "inactive");
export const STATUS_REQ = STATUS.required();

export const EXPECTEDAVAILABLE = Joi.date().allow(null, "");
export const EXPECTEDAVAILABLE_REQ = EXPECTEDAVAILABLE.required();

export const YEAR_REQ = Joi.number()
  .integer()
  .min(1901)
  .max(new Date().getFullYear());
