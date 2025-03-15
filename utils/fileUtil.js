import { unlink } from "fs";
import { resolve } from "path";

export const deleteFile = (fpath) => {
  try {
    console.log(resolve(fpath));
    unlink(resolve(fpath), () => {});
  } catch (error) {
    console.log(error);
  }
};

export const deleteUploadedFiles = (req) => {
  // if it is single file
  if (req.file) {
    deleteFile(req.file.path);
  }
  // if it is multiple file
  if (req.files) {
    req.files.map((file) => deleteFile(file.path));
  }
};
