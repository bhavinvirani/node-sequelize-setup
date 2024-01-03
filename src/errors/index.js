class CustomError extends Error {
  constructor(statusCode, message, stack) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
  }
  /* --------------------- Validation ------------------------- */
  static BadRequestError(message = 'Bad Request', stack = null) {
    return new CustomError(400, message, stack);
  }
  static NotFoundError(message = 'Not found', stack = null) {
    return new CustomError(404, message, stack);
  }
  static NoContentError(message = 'No Content', stack = null) {
    return new CustomError(204, message, stack);
  }

  /* --------------------- Authentication --------------------- */
  static UnauthorizedError(message = 'Invalid Credentials', stack = null) {
    return new CustomError(401, message, stack);
  }
  static ForbiddenError(message = 'Access denied', stack = null) {
    return new CustomError(403, message, stack);
  }
  static ConflictError(message = 'conflict occurs', stack = null) {
    return new CustomError(409, message, stack);
  }
}

module.exports = CustomError;
