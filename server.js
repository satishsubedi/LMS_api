import express from "express";
const app = express();
// middlewares
import cors from "cors";
import morgan from "morgan";
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
const PORT = process.env.PORT || 8000;
import { dbConnect } from "./config/dbConfig.js";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { responseClient } from "./middleware/responseClient.js";
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

// DB Connect

dbConnect()
  .then(() => {
    app.listen(PORT, (error) => {
      error
        ? console.log(error)
        : console.log("server is running at http://localhost:" + PORT);
    });
  })
  .catch((error) => console.log(error));

//check server status
app.get("/", (req, res) => {
  // res.json({
  //   message: "Server is live",
  // });
  const message = "Server is alive";
  responseClient({ req, res, message });
});

app.use(errorHandler);
