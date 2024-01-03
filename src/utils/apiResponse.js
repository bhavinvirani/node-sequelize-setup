class ApiResponse {
  constructor(statusCode, data, message) {
    this.success = statusCode < 400;
    this.data = data;
    this.message = message;
  }
}

const successResponse = (res, statusCode, data, message = 'Success') => {
  const response = new ApiResponse(statusCode, data, message);
  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode, message = 'Error') => {
  const response = new ApiResponse(statusCode, null, message);
  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse,
};
