import { expressjwt as jwt } from "express-jwt";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET missing in environment.");
}

export const authenticate = jwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
  getToken: function getTokenInHeader(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
  },
});

export const optionalAuthenticate = jwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: function getTokenInHeader(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
  },
});
