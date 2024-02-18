class ApiError extends Error {
  constructor(
    statusCode,
    stack = "",
    message = "Something went wrong",
    error = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
    this.data = null;
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
