import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

/**
 * Middleware that takes the username in the parameters and returns its profile.
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
export default async function getProfile(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  const { username } = req.params;
  if (!username) {
    res.status(422).json({ errors: { parameters: ["can't be empty"] } });
    return;
  }
  const reqUsername = req.auth?.user.username; // The current user's username

  try {
    const profile = await prisma.user.findUnique({
      where: { username },
      select: {
        email: true,
        username: true,
        bio: true,
        image: true,
        followedBy: {
          where: { username: reqUsername }, // Only selects this user in the followedBy array.
          select: { username: true },
        },
      },
    });
    if (!profile) {
      return res.sendStatus(404);
    }

    const responseBody = {
      ...profile,
      following: false, // assume that following is false unless the next check is true.
      followedBy: undefined, // In order to delete latter and avoid polluting everything with typescript types.
    };
    delete responseBody.followedBy;

    if (profile.followedBy.length) {
      responseBody.following = true;
    }
    return res.json(responseBody);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          logger.error(
            `Unhandled PrismaClientKnownRequestError with code ${error.code} in getProfile`
          );
          return next(error);
      }
    }
    logger.error(`Unhandled other type of error in getProfile`);
    next(error);
  }
}
