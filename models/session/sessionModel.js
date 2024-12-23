import sessionSchema from "./sessionSchema.js";

// insert user
export const createNewSession = (sessionobj) => {
  return sessionSchema(sessionobj).save();
};
// session deltee
export const deleteNewSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};
