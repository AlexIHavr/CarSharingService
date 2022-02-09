class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  static Forbidden(message) {
    return new ApiError(403, message);
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }
}

export default ApiError;
