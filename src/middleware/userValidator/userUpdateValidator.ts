import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import logger from "../../utils/logger";

export default async function userUpdateValidator(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - userUpdateValidator");
  if (!req.body) {
    logger.debug(`body is empty.`);
    return res.status(422).json({ errors: { body: ["can't be empty"] } });
  }
  const user = req.body.user;
  if (!user) {
    logger.debug(`user not defined on the request.`);
    return res
      .status(422)
      .json({ errors: { body: ["user property must exist"] } });
  }
  if (typeof user != "object") {
    logger.debug(`user must be an object.`);
    return res
      .status(422)
      .json({ errors: { body: ["user must be an object"] } });
  }
  const optional_fields = ["email", "username", "password", "image", "bio"];
  const errors = [];
  for (const key of Object.keys(user)) {
    if (typeof key != "string" && key in optional_fields) {
      logger.debug(`user field ${key} not of type string`);
      errors.push(`${key} must be of type string`);
    }
    if (!optional_fields.includes(key)) {
      logger.debug(`user field ${key} not accepted`);
      errors.push(`${key} is not one of the fields accepted`);
    }
  }
  if (errors.length) {
    return res.status(422).json({ errors: { body: errors } });
  }
  return next();
}
