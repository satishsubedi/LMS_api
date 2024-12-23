import mongoose from "mongoose";

export const dbConnect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("please provide the database connection url");
  }
  return mongoose.connect(process.env.MONGO_URL);
};

// export const dbConnect = async () => {
//   console.log(process.env.MONGO_URL);
//   try {
//     if (!process.env.MONGO_URL) {
//       throw new Error("please provide the database connection url");
//     }
//     const conn = await mongoose.connect(process.env.MONGO_URL);
//     conn && console.log("Database is connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
