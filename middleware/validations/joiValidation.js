import Joi from "joi";
import { responseClient } from "../responseClient.js";
export const validateData = ({ req, res, next, obj }) => {
  const schema = Joi.object(obj);
  const value = schema.validate(req.body);
  if (value.error) {
    responseClient({ req, res, message: value.error.message, statusCode: 400 });
  }
  next();
};
