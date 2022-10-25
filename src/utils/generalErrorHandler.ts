import { NextFunction, Request, Response } from "express";
import logger from "./logger";

export default function generalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - generalErrorHandler");
  logger.debug(`Handling error ${err.name}`);
  // Se if body is not a valid JSON parse.
  try {
    JSON.parse(req.body);
  } catch (error) {
    logger.debug("Body is not a valid JSON.");
    return res.status(422).json({ errors: { body: ["not a valid json"] } });
  }
  logger.debug(`Unhandled error ${err.name}`);
  next();
}
