import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

export default async function getProfile(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - getProfile");
  const { username } = req.params;
  if (!username)
    return res.status(422).json({ errors: { parameters: ["can't be empty"] } });
  const reqUsername = req.auth?.user.username;
  try {
    const profile = await prisma.user.findUnique({
      where: { username },
      select: {
        email: true,
        username: true,
        bio: true,
        image: true,
        followedBy: {
          where: { username: reqUsername },
          select: { username: true },
        },
      },
    });
    const responseBody = { ...profile, following: false };
    if (responseBody.followedBy?.length) {
      responseBody.following = true;
    }
    delete responseBody.followedBy;
    return res.json(responseBody);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          logger.error(
            `Unhandled PrismaClientKnownRequestError with code ${error.code} in getProfile`
          );
          next(error);
      }
    }
  }
}
