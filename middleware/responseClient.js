export const responseClient = ({
  req,
  res,
  message,
  payload,
  statusCode = 200,
}) => {
  // for success response
  req.sucess = () => {
    res.status(statusCode).json({
      status: "success",
      message,
      payload,
    });
  };
  // for error response
  req.error = () => {
    res.status(statusCode).json({
      status: "error",
      message,
    });
  };
  if (statusCode >= 200 && statusCode < 300) {
    return req.sucess();
  } else {
    return req.error();
  }
};
