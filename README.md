<h1 align="center">API Starter</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>

<p align="center">
	<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
	<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
	<a href="https://travis-ci.org/msanvarov/nest-rest-typeorm-boilerplate"><img src="https://travis-ci.org/msanvarov/nest-rest-typeorm-boilerplate.svg?branch=master" alt="Travis" /></a>
	<a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
	<a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

Table of Contents:

[Description](#-description) |
[Prerequisites](#%EF%B8%8F-prerequisites) |
[Deployment](#-deployment) |
[Environment Configuration](#-environment-configuration) |
[Choosing a Web Framework](#-choosing-a-web-framework) |
[Choosing a Database](#-choosing-a-database) |
[Testing](#-testing) |
[TypeDocs](#-typedocs) |  
[Logs](#-logs)

🔎 This repo was created with [Nx](https://nx.dev/).

### 📚 Description

This boilerplate is made to quickly prototype backend applications. It comes with authentication/authorization, logging, crud features and database persistence out of the box.

---

### 🛠️ Prerequisites

#### Non Docker

- Please make sure to have [Node.js](https://nodejs.org/en/download/) (16+) locally by downloading the Javascript runtime via `brew`, `choco`, or `apt-get`.

- Please make sure to have MYSQL locally by deploying a web server stack like [XAMPP](https://www.apachefriends.org/). The control panel can then trigger MYSQL to start on localhost. MYSQL can be downloaded standalone via `brew`, `choco`, or `apt-get`.

#### Docker 🐳

- Please make sure to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) operational to quickly compose the required dependencies. Then follow the docker procedure outlined below.

---

### 🚀 Deployment

#### Manual Deployment without Docker

- Clone the repo via `git clone https://github.com/msanvarov/nest-rest-typeorm-boilerplate`.

- Download dependencies via `npm i` or `yarn`.

- Create a **.env file** via the `cp .env.example .env` command and replace the existing environment variable placeholders with valid responses.

- Start the app in development mode by using `npm run start` (the app will be exposed on http://localhost:4200; not to conflict with React, Angular, or Vue ports).

#### Deploying with Docker 🐳

- Execute the following command in-app directory:

```bash
# creates and loads the docker container in detached mode with the required configuration
$ docker-compose up -d
```

- The following command will download dependencies and execute the web application on http://localhost:80 (deployed behind a Nginx reverse proxy).

---

### 🔒 Environment Configuration

By default, the application comes with a config module that can read in every environment variable from the `.env` file.

**APP_ENV** - the application environment to execute as, either in development or production. Determines the type of logging options to utilize. Options: `dev` or `prod`.

**APP_URL** - the base URL for the application. Made mainly to showcase the power of `ConfigService` and can be removed as it doesn't serve any other purpose

**WEBTOKEN_ENCRYPTION_KEY** - the key to encrypt/decrypt web tokens with. Make sure to generate a random alphanumeric string for this.

**WEBTOKEN_EXPIRATION_TIME** - **the time in seconds** indicating when the web token will expire; by default, it's 2400 seconds which is 40 mins.

**DB_TYPE** - the type of [database connection to use](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md).

**DB_USERNAME** - username for authenticating against the database.

**DB_PASSWORD** - password for authenticating against the database, can be left empty if a password is not needed (not recommended).

**DB_HOST** - the endpoint where this database sits (usually localhost but can be a static address).

**DB_PORT** - default ports for different types of database connections.

**DB_DATABASE** - the actual database name to perform operations on.

---

### 🏗 Choosing a Web Framework

This boilerplate comes with [Fastify](https://github.com/fastify/fastify) out of the box as it offers [performance benefits](https://github.com/nestjs/nest/blob/master/benchmarks/all_output.txt) over Express. But the Express version is still accessible on a [different branch](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/tree/express).

---

### 💾 Choosing a Database

By default **MYSQL/MariaDB** are the database of choice but TypeORM supports other database types like SQLite, Postgres, MongoDB, and MSSQL. To use anything other than MYSQL/MariaDB, change the configuration in the `.env` file, and download the corresponding wrapper library, like [SQLite3](https://www.npmjs.com/package/sqlite3).

> Check https://typeorm.io/ for supported database types.

**Remark: For MongoDB, TypeORM is not as feature-rich as Mongoose. Therefore I created another boilerplate for [Nest and Mongoose](https://github.com/msanvarov/nest-rest-mongo-boilerplate)**.

---

### ✅ Testing

#### Docker 🐳

```bash
# unit tests
$ docker exec -it nest yarn test

# e2e tests
$ docker exec -it nest yarn test:e2e

# test coverage
$ docker exec -it nest yarn test:cov
```

#### Non-Docker

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

### 💡 TypeDocs

The documentation for this boilerplate can be found [on Github pages](https://msanvarov.github.io/nest-rest-typeorm-boilerplate/).

The docs can be generated on-demand, simply, by typing `npm run typedocs`. This will produce a **docs** folder with the required front-end files and **start hosting on [localhost](http://localhost:8080/)**.

```bash
# generate docs for code
$ npm run typedocs
```

---

### 📝 Open API

Out of the box, the web app comes with Swagger; an [open api specification](https://swagger.io/specification/), that is used to describe RESTful APIs. Nest provides a [dedicated module to work with it](https://docs.nestjs.com/openapi/introduction).

The configuration for Swagger can be found at this [location](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/blob/master/apps/api/src/main.ts).

---

### ✨ TypeORM

TypeORM is an object-relational mapping that acts as an abstraction layer over operations on databases. Please view the [documentation](https://typeorm.io/#/) for further details.

The configuration for TypeORM can be found in the [app module](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/blob/master/apps/api/src/app.module.ts#L33-L51).

---

### 🔊 Logs

This boilerplate comes with a Winston module for **extensive logging**, the configurations for Winston can be found in the [app module](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/blob/master/apps/api/src/app.module.ts#L52-L89).

---

### 🏗️ Progress

|                                                                       Branches | Status |
| -----------------------------------------------------------------------------: | :----- |
|             [main](https://github.com/msanvarov/nest-rest-typeorm-boilerplate) | ✅     |
| [feat/\*](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/branches) | 🚧     |

<!-- > Remark: This template was employed to create a [Real World example app](https://github.com/gothinkster/realworld) on [Github](). -->

---

### 👥 Support

PRs are appreciated, I fully rely on the passion ❤️ of the OS developers.

---

## License

This starter API is [MIT licensed](LICENSE).

[Author](https://sal-anvarov.tech/)
