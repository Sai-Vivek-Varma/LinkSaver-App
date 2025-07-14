const ERROR_TYPES = {
  VALIDATION_ERROR: "ValidationError",
  DUPLICATE_ERROR: 11000,
  CAST_ERROR: "CastError",
  JWT_ERROR: "JsonWebTokenError",
  JWT_EXPIRED: "TokenExpiredError",
};

export const errorMiddleware = (err, req, res, next) => {
  err.status ||= 500;
  err.message ||= "Internal server Error";

  let errors = null;

  switch (true) {
    case err.code === ERROR_TYPES.DUPLICATE_ERROR:
      err.status = 400;
      err.message = `${Object.keys(err.keyValue)[0]} already exists`;
      break;

    case err.name === ERROR_TYPES.VALIDATION_ERROR:
      err.status = 400;
      err.message = "Validation Error";
      errors = Object.values(err.errors).map((e) => e.message);
      break;

    case err.name === ERROR_TYPES.CAST_ERROR:
      err.status = 400;
      err.message = "Invalid ID format";
      break;

    case err.name === ERROR_TYPES.JWT_ERROR:
      err.status = 401;
      err.message = "Invalid token";
      break;

    case err.name === ERROR_TYPES.JWT_EXPIRED:
      err.status = 401;
      err.message = "Token expired";
      break;

    default:
      break;
  }

  res.status(err.status).json({
    success: false,
    message: err.message,
    errors,
  });
};
