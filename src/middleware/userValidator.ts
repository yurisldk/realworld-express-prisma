import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

interface ValidationError {
  body?: Array<string>;
}

export async function userLoginValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - userLoginValidator");
  const errors: ValidationError = {};
  errors.body = [];
  if (!req.body) {
    errors.body.push("can't be empty");
  } else {
    const { user } = req.body;
    if (!user) {
      errors.body.push("user object must be defined");
    } else {
      const { password, email } = user;
      if (!password) {
        errors.body.push("password property in user can't be empty");
      } else if (typeof password != "string") {
        errors.body.push("password property in user must be a string");
      }
      if (!email) {
        errors.body.push("email property in user can't be empty");
      } else if (typeof email != "string") {
        errors.body.push("email property in user must be a string");
      }
    }
  }
  if (errors.body.length) return res.status(422).json({ errors });
  else {
    logger.debug("user validated correctly.");
    next();
  }
}
