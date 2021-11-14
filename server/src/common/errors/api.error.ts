export default class ApiError extends Error {
  readonly name: string;
  readonly status: number;
  readonly errors: unknown[] | [];

  constructor(
    name: string,
    status: number,
    message: string,
    errors: unknown[] | [] = []
  ) {
    super(message);

    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.status = status;
    this.message = message;
    this.errors = errors;

    Error.captureStackTrace(this);
  }

  static BadRequest(
    message = 'The server could not understand the request due to invalid syntax.',
    errors = []
  ) {
    return new ApiError('Bad Request', 400, message, errors);
  }

  static UnauthorizedError() {
    return new ApiError(
      'Unauthorized',
      401,
      'User in not authorized: you must authenticate itself to get the requested response.'
    );
  }

  static ForbiddenError() {
    return new ApiError(
      'Forbidden',
      403,
      'You have no access rights to the content.'
    );
  }

  static NotFound() {
    return new ApiError(
      'Not Found',
      404,
      'The server can not find the requested resource.'
    );
  }
}
