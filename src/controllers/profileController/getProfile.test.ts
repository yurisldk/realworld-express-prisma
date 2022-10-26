import { User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../utils/db/prisma";
import getProfile from "./getProfile";

describe("Testing getProfile controller", function () {
  const next = jest.fn((x) => x);
  const res = {
    status: jest.fn().mockReturnThis(),
    sendStatus: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  const findUnique = jest
    .spyOn(prisma.user, "findUnique")
    .mockResolvedValue(null);

  beforeEach(function () {
    jest.clearAllMocks();
  });

  test("Responds with error if no username in request parameters", async function () {
    const req = {
      params: {},
    } as unknown as Request;
    await getProfile(req, res, next);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      errors: { parameters: ["can't be empty"] },
    });
  });

  test("Retrieves the profile when no auth is given.", async function () {
    const req = {
      params: { username: "username_to_retrieve" },
    } as unknown as Request;
    const foundProfile = {
      bio: null,
      email: "default@email.com",
      image: null,
      username: "default",
      followedBy: [],
    };
    findUnique.mockResolvedValue(foundProfile as unknown as User);
    await getProfile(req, res, next);
    expect(findUnique).toBeCalled();

    const responseBody = {
      ...foundProfile,
      following: false,
      followedBy: undefined,
    };
    delete responseBody.followedBy;

    expect(res.json).toHaveBeenCalledWith(responseBody);
  });
  test("Send code 404 if profile is not found.", async function () {
    const req = {
      params: { username: "username_to_retrieve" },
    } as unknown as Request;
    findUnique.mockResolvedValue(null);
    await getProfile(req, res, next);
    expect(findUnique).toBeCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });
  test("Retrieves the profile with following if conditions met.", async function () {
    const req = {
      params: { username: "username_to_retrieve" },
      auth: { user: { username: "testing_auth_username" } },
    } as unknown as Request;
    const foundProfile = {
      bio: null,
      email: "default@email.com",
      image: null,
      username: "default",
      followedBy: ["testing_auth_username"],
    };
    findUnique.mockResolvedValue(foundProfile as unknown as User);
    await getProfile(req, res, next);

    const responseBody = {
      ...foundProfile,
      following: true,
      followedBy: undefined,
    };
    delete responseBody.followedBy;

    expect(res.json).toHaveBeenCalledWith(responseBody);
  });
});
