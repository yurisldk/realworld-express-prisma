import createToken from "../../../utils/auth/createToken";
import jwt from "jsonwebtoken";

describe("Testing token creation", () => {
  test("throw error if JWT_SECRET is not defined", function () {
    delete process.env.JWT_SECRET;
    expect(createToken).toThrowError("JWT_SECRET missing in environment.");
  });
  test("create a jwt with user info", function () {
    process.env.JWT_SECRET = "TEST_SECRET";
    const data = {
      user: {
        name: "test@test.com",
        password: "plainText",
      },
    };
    const payload = JSON.stringify(data);
    const result = createToken(payload);
    expect(result).toBeDefined();
    const decoded = jwt.decode(result);
    expect(decoded).toMatchObject(data);
  });
});
