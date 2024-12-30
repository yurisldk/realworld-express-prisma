import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const users: any[] = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.sentence(),
        image: faker.image.avatar()
      }
    });
    users.push(user);
  }

  const existingTags: string[] = [];

  for (let i = 0; i < 100; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const article = await prisma.article.create({
      data: {
        title: faker.lorem.words(3),
        slug: faker.lorem.slug(),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraph({ min: 5, max: 20 }),
        author: {
          connect: { username: randomUser.username }
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    const tagsCount = Math.floor(Math.random() * 3) + 2;
    for (let t = 0; t < tagsCount; t++) {
      let tagName;

      if (existingTags.length > 0 && Math.random() > 0.5) {
        tagName = existingTags[Math.floor(Math.random() * existingTags.length)];
      } else {
        tagName = faker.lorem.word();
        existingTags.push(tagName);

        await prisma.tag.upsert({
          where: { tagName },
          update: {},
          create: { tagName }
        });
      }

      await prisma.article.update({
        where: { slug: article.slug },
        data: {
          tagList: {
            connect: { tagName }
          }
        }
      });
    }

    const commentsCount = Math.floor(Math.random() * 6);
    for (let c = 0; c < commentsCount; c++) {
      const randomCommenter = users[Math.floor(Math.random() * users.length)];
      await prisma.comment.create({
        data: {
          body: faker.lorem.sentence(),
          author: {
            connect: { username: randomCommenter.username }
          },
          Article: {
            connect: { slug: article.slug }
          }
        }
      });
    }

    const favoritesCount = Math.floor(Math.random() * users.length);
    const favoritingUsers = users.slice(0, favoritesCount);
    for (const user of favoritingUsers) {
      await prisma.article.update({
        where: { slug: article.slug },
        data: {
          favoritedBy: {
            connect: { username: user.username }
          }
        }
      });
    }
  }

  for (const user of users) {
    const followCount = Math.floor(Math.random() * 5);
    const followees = users
      .filter((u) => u.username !== user.username)
      .slice(0, followCount);
    for (const followee of followees) {
      await prisma.user.update({
        where: { username: user.username },
        data: {
          follows: {
            connect: { username: followee.username }
          }
        }
      });
    }
  }

  console.log("✅ Seed data successfully added!");
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
