import Joi from "joi";
import { responseClient } from "../responseClient.js";
import { deleteUploadedFiles } from "../../utils/fileUtil.js";
export const validateData = ({ req, res, next, obj }) => {
  const schema = Joi.object(obj);
  const value = schema.validate(req.body);

  if (value.error) {
    if (req.file || Array.isArray(req.files)) {
      // delete the uploaded file
      deleteUploadedFiles(req);
    }
    responseClient({ req, res, message: value.error.message, statusCode: 400 });
  }
  next();
};
