export class DBValidationError extends Error {
  name: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'DBValidationError';
    this.statusCode = statusCode;
  }

  getErrorObject(): { status: number; message: string } {
    return {
      status: this.statusCode,
      message: this.message,
    };
  }
}

export class DBPropertyNotExistError extends DBValidationError {
  property: string;
  static statusCode: number = 404;

  constructor(property: string) {
    super(
      'No record found in a database with the passed ' + property + ' value.',
      DBPropertyNotExistError.statusCode
    );
    this.name = 'DBPropertyNotExistError';
    this.property = property;
  }
}
