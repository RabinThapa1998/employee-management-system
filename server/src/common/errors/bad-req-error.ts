import { CommonError } from "./common-error";

export class BadReqError extends CommonError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, BadReqError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
