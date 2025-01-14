import { responseClient } from "../middleware/responseClient.js";
import {
  createNewSession,
  deleteManySession,
  deleteNewSession,
} from "../models/session/sessionModel.js";
import {
  createNewUser,
  getUserByEmail,
  updateUser,
} from "../models/user/userModel.js";
import {
  emailActivationUrl,
  userEmailActivation,
} from "../services/email/emailService.js";
import { comparePassword, hashpassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { getJwts } from "../utils/jwt.js";
export const insertNewUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashpassword(password);

    // insert into db
    const user = await createNewUser(req.body);

    if (user?._id) {
      // create an unique link activation link and send to their email
      const sessionobj = {
        token: uuidv4(),
        association: user.email,
      };

      const session = await createNewSession(sessionobj);
      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?sessionid=${session._id}&t=${session.token}`;
        const emailId = await emailActivationUrl({
          email: user.email,
          name: user.fName,
          url,
        });
        console.log(emailId);
        if (emailId) {
          const message =
            "we have sent to you an email and plese the link to activate your account";
          responseClient({ req, res, message });
          return;
        }
      }
    }
    res.json({
      status: "error",
      message: "Unable to create an account Please try again later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "Already the email is used by another user.. Please try with different email";
      error.statusCode = 400;
    }
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const { sessionid, t } = req.body;
    console.log(sessionid, t);
    const session = await deleteNewSession({
      _id: sessionid,
      token: t,
    });
    console.log(session);
    if (session?._id) {
      const updatedUser = await updateUser(
        { email: session.association },
        { status: "active" }
      );
      console.log(updatedUser);
      if (updatedUser?.id) {
        const message = "Your account is activated .You may can login now";
        responseClient({ req, res, message });
        return userEmailActivation({
          email: updatedUser.email,
          name: updatedUser.fName,
        });
      }
    } else {
      const statusCode = 400;
      const message = "invalid token";
      return responseClient({ req, res, message, statusCode });
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail({ email });

    if (user?._id) {
      // compare password
      console.log(password, user.password);
      const isMatch = comparePassword(password, user.password);

      if (isMatch) {
        // console.log("User authenticated succesfully");
        // generate tokens
        //store tokens
        //response token
        const jwts = await getJwts(user.email);
        // console.log(jwts);
        return responseClient({
          req,
          res,
          message: "User Login Sucessfully",
          payload: jwts,
        });
      }
    }
    responseClient({
      req,
      res,
      message: "Invalid Login Details",
      statusCode: 401,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    // get the token

    const { email } = req.userInfo;
    // update refreshjwt to ""
    await updateUser({ email }, { refreshJWT: "" });

    // delete the accessjwt from session table
    await deleteManySession({ association: email });
  } catch (error) {
    next(error);
  }
};
