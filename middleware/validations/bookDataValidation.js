import {
  _ID_REQ,
  EXPECTEDAVAILABLE_REQ,
  ISBN_REQ,
  LONG_STR,
  LONG_STR_REQ,
  SHORT_STR_REQ,
  STATUS_REQ,
  STR_ARRAY,
  YEAR_REQ,
} from "./joiConst.js";
import { validateData } from "./joiValidation.js";
export const validateNewBookData = (req, res, next) => {
  const obj = {
    title: SHORT_STR_REQ,
    year: YEAR_REQ,
    author: SHORT_STR_REQ,
    // imgUrl: LONG_STR_REQ,
    isbn: ISBN_REQ,
    genre: SHORT_STR_REQ,
    description: LONG_STR_REQ,
  };
  return validateData({ req, res, next, obj });
};

export const validateEditBookData = (req, res, next) => {
  req.body.expectedAvailable =
    req.body.expectedAvailable === "null" ? null : req.body.expectedAvailable;
  if (req.body.imageTodelete) {
    if (!Array.isArray(req.body.imageTodelete)) {
      req.body.imageTodelete = [req.body.imageTodelete];
    }
  }

  const obj = {
    title: SHORT_STR_REQ,
    year: YEAR_REQ,
    author: SHORT_STR_REQ,
    imgUrl: LONG_STR_REQ,
    imageList: LONG_STR_REQ.allow(""),
    imageTodelete: STR_ARRAY,
    genre: SHORT_STR_REQ,
    description: LONG_STR_REQ,
    status: STATUS_REQ,
    expectedAvailable: EXPECTEDAVAILABLE_REQ,
    _id: _ID_REQ,
  };
  return validateData({ req, res, next, obj });
};
