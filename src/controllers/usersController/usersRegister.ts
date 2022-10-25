import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { createToken } from "../../utils/auth";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

export default async function usersRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - userRegister");
  if (!req.body?.user) {
    logger.debug("userLogin received request with user undefined");
    return next(new Error("user not defined"));
  }
  const { email, password, username } = req.body.user;
  if (!email) {
    logger.debug("userLogin received request with email undefined");
    return next(new Error("user email not defined"));
  }
  if (!password) {
    logger.debug("userLogin received request with password undefined");
    return next(new Error("user password not defined"));
  }
  if (!username) {
    logger.debug("userLogin received request with username undefined");
    return next(new Error("user username not defined"));
  }
  try {
    // TODO store hashed password.
    const user = await prisma.user.create({
      data: { email, password, username },
      select: { email: true, username: true, bio: true, image: true },
    });
    logger.debug(`Creating token for user ${user.username}`);
    const token = createToken(JSON.stringify({ user }));
    const responseBody = { user: { ...user, token } };
    return res.status(201).json(responseBody);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      logger.debug(
        `Error adding user ${email} to database with error ${error.code}`
      );
      switch (error.code) {
        case "P2002":
          logger.debug(
            `User with ${error.meta?.target} already exists in database`
          );
          return res.status(422).json({
            errors: {
              body: [`user with ${error.meta?.target} already exists`],
            },
          });
        default:
          logger.error(
            `PrismaClientKnownRequestError with code ${error.code} found and unhandled in usersRegister`
          );
          return next(error);
      }
    }
    logger.error(`Unhandled error ${error} in usersRegister`);
    return next(error);
  }
}
