import { expressjwt as jwt } from "express-jwt";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET missing in environment.");
}

// Authenticate is a middleware that will not throw errors, only if user is able to authenticate.
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

// OptionalAuthenticate is a middleware that will not throw errors, the authentication is optional.
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
