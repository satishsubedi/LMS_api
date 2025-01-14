import sessionSchema from "./sessionSchema.js";

// insert user
export const createNewSession = (sessionobj) => {
  return sessionSchema(sessionobj).save();
};
// session deltee
export const deleteNewSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};

export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};

export const deleteManySession = (filter) => {
  return sessionSchema.deleteMany(filter);
};
