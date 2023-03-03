export abstract class CommonError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CommonError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
