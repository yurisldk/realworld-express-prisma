# Configuration and Solution for RealWorld Backend Challenges

This repository provides a solution for developers working on the RealWorld application. Due to recent changes in the [RealWorld API specifications](https://github.com/gothinkster/realworld/issues/1611), the official API server has been deleted, and the demo deployment is no longer available. As a result, developers relying on this backend have encountered issues.

This repository addresses these challenges by providing an alternative backend solution built with **TypeScript + Express + Prisma**. It offers full compatibility with the updated RealWorld API specifications and can be used to keep your project running smoothly.

This fork was created specifically for use with the [RealWorld React FSD project](https://github.com/yurisldk/realworld-react-fsd), providing a seamless backend implementation for that frontend.

## Features of this Fork

### 1. Predefined `.env.development` Configuration

This project includes a predefined `.env.development` file to quickly set up a local development environment. The file contains necessary environment variables, such as the database URL and JWT secret. It is **also connected to the `docker-compose.yml` file**, ensuring that both local and containerized environments are properly configured.

However, **do not commit this file to version control** as it contains sensitive information like the JWT secret. **Always add `.env.development` to your `.gitignore` file** before committing any changes. While it is provided for convenience to get started quickly, you should generate your own environment files for use in production or other environments.

### 2. Predefined `docker-compose.yml` Configuration

In addition to the `.env.development` file, this project includes a predefined `docker-compose.yml` file. This configuration allows you to easily set up a containerized environment for your development and testing. It ensures that the necessary services, such as the database and application server, are configured and ready to run with a single command.

The `docker-compose.yml` file is pre-configured to work with Docker, simplifying the process of running the project in an isolated containerized environment. It also integrates smoothly with the `.env.development` file to set environment variables for the containers.

### 3. Database Seeding

This project includes a **database seeding script** that initializes the database with default data to make development and testing easier.

# ![RealWorld Example App](logo.png)

> ## Typescript + Express + Prisma codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://realworld.seuronao.duckdns.org)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a backend built with **Typescript + Express + Prisma** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Typescript** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

## How it works

The project is build using [TypeScript](https://www.typescriptlang.org/) for language, [Express](https://expressjs.com/) for routing and server framework and [Prisma](https://www.prisma.io/) as an _ORM_.

The project uses [PostgreSQL](https://www.postgresql.org/) for the database.

For unit testing it uses the [Jest](https://jestjs.io/) framework since it is what is promoted by prisma team to mock testing function that change the database.

## Getting started

### On the first run

1. Run `npm install` to install the dependencies.
2. To update the database in development mode use `npm run docker:migrate`.
3. To run the development version `npm run develop`.

### On the other runs

1. To run the development version `npm run develop`.

### Other commands

- To test the application `npm test`.
- To build a production version `npm run build`.
- To run the production build `npm run start`.
