import prisma from "../prisma";
import { faker } from "@faker-js/faker";

export default async function userCreatePrisma(
  username: string,
  email: string,
  password: string
) {
  const user = await prisma.user.create({
    data: { username, email, password, image: faker.image.avatar() },
  });
  return user;
}
