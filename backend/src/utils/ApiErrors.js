class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    stack = "",
    error = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
    data: null;
    this.error = error;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;