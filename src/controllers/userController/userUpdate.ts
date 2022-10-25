import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Response } from "express";
import { Request as JWTRequest } from "express-jwt";
import { createToken } from "../../utils/auth";
import prisma from "../../utils/db/prisma";
import logger from "../../utils/logger";

export default async function userUpdate(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  logger.debug("Starting - userUpdate");
  console.log(req.auth);
  const { username: currentUsername } = req.auth && req.auth.user;
  const user = req.body.user;
  // TODO update user password here to the hashed value.
  try {
    const updatedUser: Partial<User> = await prisma.user.update({
      where: { username: currentUsername },
      data: user,
    });
    delete updatedUser.password;
    const token = createToken(JSON.stringify({ user: updatedUser }));
    const responseBody = { user: { ...updatedUser, token } };
    console.log(responseBody);
    return res.json(responseBody);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2025":
          logger.debug(
            "Handling error P2025, operation failed because record to update not found"
          );
          return res.sendStatus(404);
        default:
          logger.error(
            `Unhandled PrismaClientKnownRequestError with code ${error.code}`
          );
          next(error);
      }
    }
  }
}
