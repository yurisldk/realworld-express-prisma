import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { createToken } from "../../utils/auth";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

/**
 * Middleware that gets the current user based on the JWT given.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function userGet(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - userGet");
  const { username } = req.auth && req.auth.user;
  try {
    const user: Partial<User> | null = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.sendStatus(404);
    }
    delete user.password;
    const token = createToken(JSON.stringify({ user }));
    const responseBody = { user: { ...user, token } };
    logger.debug(`Found user with ${user.email}`);
    return res.json(responseBody);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          logger.error(
            `Unhandled PrismaClientKnownRequestError with code ${error.code}`
          );
          return next(error);
      }
    }
  }
}
