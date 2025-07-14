export const responseHandler = (req, res, next) => {
  res.apiResponse = (data = null, message = "Success", statusCode = 200) => {
    return res.status(statusCode).json({
      success: statusCode < 400,
      message,
      data,
    });
  };

  res.apiError = (
    message = "Internal Server Error",
    statusCode = 500,
    errors = null
  ) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  };

  next();
};
