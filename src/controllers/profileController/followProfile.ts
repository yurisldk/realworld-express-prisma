import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

/**
 * Middleware that adds the username in the parameters to the current user followers list.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function followProfile(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - followProfile");
  const username = req.params.username;
  const currentUsername = req.auth?.user.username;
  if (!username)
    return res
      .status(422)
      .json({ errors: { parameters: ["username can't be empty"] } });
  try {
    const followedUser = await prisma.user.update({
      where: { username },
      data: { followedBy: { connect: { username: currentUsername } } },
    });
    const responseBody = { ...followedUser, following: true };
    return res.json(responseBody);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          logger.error(
            `Unhandled PrismaClientKnownRequestError with code ${error.code} in followProfile`
          );
          return next(error);
      }
    }
  }
}
