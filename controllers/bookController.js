import { responseClient } from "../middleware/responseClient.js";
import {
  createNewBook,
  deleteBook,
  getAllAdminBooks,
  getAllPublicBooks,
  updateBook,
} from "../models/book/bookModel.js";
import slugify from "slugify";
import { deleteFile, deleteUploadedFiles } from "../utils/fileUtil.js";

export const insertNewBook = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    const { path } = req.file;
    const obj = {
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      addedBy: { name: fName, adminId: _id },
      lastUpdateBy: { name: fName, adminId: _id },
      imgUrl: path,
      imageList: path,
    };

    const book = await createNewBook(obj);
    book?._id
      ? responseClient({ req, res, message: "New Book Added Sucessfully" })
      : responseClient({
          req,
          res,
          message: "Unable to insert New Book",
          statusCode: 401,
        });
  } catch (error) {
    if (req.file || Array.isArray(req.files)) {
      deleteUploadedFiles(req);
    }
    if (error.message.includes("E11000 duplicate key error collection")) {
      return responseClient({
        req,
        res,
        message:
          "Duplicate data is not allowed" + JSON.stringify(error.keyValue),
        statusCode: 400,
      });
    }
    next(error);
  }
};

export const getAllAdminBooksController = async (req, res, next) => {
  try {
    const payload = await getAllAdminBooks();
    // console.log(payload.author);
    payload &&
      responseClient({
        req,
        res,
        message: "All the books fetched by Admin",
        payload,
      });

    // console.log(books);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export const getAllPublicBooksController = async (req, res, next) => {
  try {
    const payload = await getAllPublicBooks({ status: "active" });
    // console.log(payload.author);
    payload &&
      responseClient({
        req,
        res,
        message: "All the books fetched by the Public",
        payload,
      });

    // console.log(books);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export const updateBookController = async (req, res, next) => {
  try {
    const { fName, _id } = req.userInfo;
    req.body.imageList = req.body.imageList.split(",");
    if (req.body.imageTodelete) {
      req.body.imageList = req.body.imageList.filter(
        (img) => !req.body.imageTodelete.includes(img)
      );
      req.body.imageTodelete.map((img) => deleteFile(img));
    }

    if (Array.isArray(req.files)) {
      req.body.imageList = [
        ...req.body.imageList,
        ...req.files.map((obj) => obj.path),
      ];
    }
    const obj = {
      ...req.body,
      lastUpdateBy: { name: fName, adminId: _id },
    };
    console.log(obj);
    const book = await updateBook(obj);
    book?._id
      ? responseClient({ req, res, message: " Book Updated Sucessfully" })
      : responseClient({
          req,
          res,
          message: "Unable to Update Book",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};

export const deleteBookController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    console.log(_id);

    const book = await deleteBook({ _id });
    book?._id
      ? responseClient({ req, res, message: " Book Deleted Sucessfully" })
      : responseClient({
          req,
          res,
          message: "Unable to Delete Book",
          statusCode: 400,
        });
  } catch (error) {
    next(error);
  }
};
