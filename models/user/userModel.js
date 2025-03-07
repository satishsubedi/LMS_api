import userSchema from "./userSchema.js";

// insert user
export const createNewUser = (userobj) => {
  return userSchema(userobj).save();
};
export const updateUser = (condition, update) => {
  return userSchema.findOneAndUpdate(condition, update, { new: true });
};
export const getUserByEmail = (filter) => {
  return userSchema.findOne(filter);
};
export const getOneUser = (filter) => {
  return userSchema.findOne(filter);
};
