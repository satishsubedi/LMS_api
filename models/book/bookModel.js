import bookSchema from "./bookSchema.js";
export const createNewBook = (bookobj) => {
  return bookSchema(bookobj).save();
};

export const getAllAdminBooks = () => {
  return bookSchema.find();
};

export const getAllPublicBooks = (filter) => {
  return bookSchema.find(filter);
};

export const updateBook = ({ _id, ...rest }) => {
  return bookSchema.findByIdAndUpdate(_id, rest);
};

export const deleteBook = (id) => {
  console.log(id);
  return bookSchema.findByIdAndDelete(id);
};
