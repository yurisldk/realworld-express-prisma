import { NextFunction, Request, Response } from "express";
import { createToken } from "../../utils/auth";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

/**
 * Controller for the login function sending a valid jwt token in the response if login is successful.
 * @param req Request in witch body contains a json with user object with name and email as properties.
 * @param res Response
 */
export default async function userLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - userLogin");
  if (!req.body?.user) {
    logger.debug("userLogin received request with user undefined.");
    return next(new Error("user not defined."));
  }
  const { email, password } = req.body.user;
  if (!email) {
    logger.debug("userLogin received request with email undefined.");
    return next(new Error("user email not defined."));
  }
  if (!password) {
    logger.debug("userLogin received request with password undefined.");
    return next(new Error("user password not defined."));
  }
  const user = await prisma.user.findUnique({
    where: { email },
    select: { email: true, username: true, bio: true, image: true },
  });
  if (!user) {
    logger.debug(`userLogin did not find user ${email}.`);
    return res.sendStatus(404);
  }
  logger.debug(`userLogin found user with ${user.email}.`);
  const token = createToken(JSON.stringify({ user }));
  const responseBody = { user: { ...user, token } };
  return res.json(responseBody);
}
