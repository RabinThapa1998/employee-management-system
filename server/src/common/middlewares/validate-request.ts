import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const results = validationResult(req).array();

  if (!results.length) {
    return next();
  }
  const error = results[0].msg;
  res.json({ success: false, message: error });
};
