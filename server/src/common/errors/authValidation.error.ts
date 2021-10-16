interface IErrorObject {
  status: number;
  message: string;
}

class AuthValidationError extends Error {
  readonly name: string;
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'AuthValidationError';
    this.statusCode = statusCode;
  }

  private getErrorObject(): IErrorObject {
    return {
      status: this.statusCode,
      message: this.message,
    };
  }

  // getInvalidLoginResponse(): IErrorObject {
  //   this.getErrorObject();
  // }
}
