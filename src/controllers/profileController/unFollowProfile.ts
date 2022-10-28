import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

export default async function unFollowProfile(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - unFollowProfile");
  const username = req.params.username;
  const currentUsername = req.auth?.user.username;
  if (!username)
    return res
      .status(422)
      .json({ errors: { parameters: ["username can't be empty"] } });
  try {
    const followedUser = await prisma.user.update({
      where: { username },
      data: { followedBy: { disconnect: { username: currentUsername } } },
    });
    const responseBody = { ...followedUser, following: false };
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
