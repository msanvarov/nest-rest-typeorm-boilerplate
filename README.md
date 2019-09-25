<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://travis-ci.org/msanvarov/nest-rest-typeorm-boilerplate"><img src="https://travis-ci.org/msanvarov/nest-rest-typeorm-boilerplate.svg?branch=master" alt="Travis" /></a>
<a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
<a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

### 📚 Description

This boilerplate is made to quickly prototype backend applications. It comes with authentication, logging, security, and database features out of the box.

---

### 🛠️ Prerequisites

#### Non Docker

- Please make sure to have MYSQL locally by utilizing a web server stack [XAMPP](https://www.apachefriends.org/). The control panel can then trigger MYSQL to start on localhost.

#### Docker 🐳

- Please make sure to have docker desktop on the operating system of choice to quickly compose both MariaDB and Nginx. Then follow the docker procedure outlined below.

**Note**: Docker Desktop comes free on both Mac and Windows, but it only works with Windows 10 Pro. A workaround is to get [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/) which will bypass the Windows 10 Pro prerequisite by executing in a VM.

---

### 🚀 Setup

#### Manual Deployment without Docker

- Create a .env file using the `cp .env.example .env` command and replace the existing environment variables with personal configuration settings (username and password database).

- Download dependencies using `npm i` or `yarn`

- Start the app for pre-production using `npm run start` or `npm run start:dev` for development (the app will be exposed on the port 9000; safe port that doesn't conflict with React, Angular, or Vue)

#### Deploying with Docker 🐳

- Execute the following command in-app directory:

```bash
# creates and loads the docker container in detached mode with the required configuration
$ docker-compose up -d
```

- The following command will set up and run the docker project for quick use (building both Dockerfile and Dockerfile-Nginx). Then the web application, Nginx, and MariaDB will be exposed to http://localhost:9000, http://localhost:80, and http://localhost:3306 respectively.

### 🔒 Environment Configuration

By default, the application comes with a config module that will inject the `ConfigService` to read every environment variable from the `.env` file.

**APP_ENV** - the application environment it will be executing as, either in development or production. Determines the type of logging options to utilize. Options: `dev` or `prod`. 

**APP_URL** - the base URL for the application. Made mainly to showcase the `ConfigService` and can be removed if not used.

**WEBTOKEN_SECRET_KEY** - the secret key to encrypt/decrypt web tokens with. Make sure to generate a random alphanumeric string for this. Not 

**WEBTOKEN_EXPIRATION_TIME** - **the time in seconds** indicating when the web token will expire; by default, it's 2400 seconds which is 40 mins.

**DB_TYPE** - the type of [database connection to use](https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md).

**DB_USERNAME** - username for authenticating against the database.

**DB_PASSWORD** - password for authenticating against the database, can be left empty if a password is not needed (not recommended).

**DB_HOST** - the endpoint where this database sits (usually localhost but can be a static address).

**DB_PORT** - default ports for different types of database connections.

**DB_DATABASE** - the actual database name to perform operations on.

---

### 🏗 Choosing a Web Framework

This boilerplate comes with [Fastify](https://github.com/fastify/fastify) out of the box as it offers [performance benefits](https://github.com/nestjs/nest/blob/master/benchmarks/all_output.txt) over Express. But this can be changed to use [Express](https://expressjs.com/) framework instead of Fastify. Please proceed the steps below to change between the two.

- Replace the following lines of code in the [main.ts file](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/blob/master/src/main.ts) with the ones detailed below.

```ts
// from (fastify):
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as headers from 'fastify-helmet';
import * as fastifyRateLimiter from 'fastify-rate-limit';
const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter({ logger: console }),
);
app.register(headers);
app.register(fastifyRateLimiter, {
  max: 100,
  timeWindow: '1 minute',
});

// to (express):
import * as headers from 'helmet';
import * as rateLimiter from 'express-rate-limit';
const app = await NestFactory.create(AppModule, {
  logger: console,
});
app.use(headers());
app.use(
  rateLimiter({
    windowMs: 60, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);
```

**Note**: The `package.json`comes with dependencies for both Express and Fastify to support moving between two. But this can leave the project bloated especially when only one web framework is being used. Thus it is recommended that when deploying to production, a purger of unused dependencies occurs. 

If you choose to **use Fastify**, this command will **purge all of the Express dependencies**:

```bash
# removing Express dependencies
$ npm rm @nestjs/platform-express express-rate-limit helmet swagger-ui-express @types/express --save
```

If you choose to **use Express**, this command will **purge all of the Fastify dependencies**:

```bash
# removing Fastify dependencies
$ npm rm @nestjs/platform-fastify fastify-helmet fastify-rate-limit fastify-swagger --save
```

---

### 💾 Choosing a Database

By default **MYSQL/MariaDB** are the database of choice but support for other database types like SQLite, Postgres, MongoDB, and MSSQL exist. To use anything other than MYSQL/MariaDB, change the configuration in the `.env` file, and download the corresponding wrapper library, like [sqlite3](https://www.npmjs.com/package/sqlite3) if necessary.

**Note: For MongoDB, TypeORM is not a feature-rich as Mongoose. Therefore I created another boilerplate for Nest and [Mongoose](https://github.com/msanvarov/nest-rest-mongo-boilerplate)**.

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

The docs can be generated on-demand, simply, by typing `npm run typedocs`. This will produce a **docs** folder with the required front-end files and **start hosting on localhost port 8080**.

```bash
# generate docs for code
$ npm run typedocs
```

---

### 📝 Open API

Out of the box, the web app comes with an [open api specification](https://swagger.io/specification/), that is used to describe RESTful APIs. Nest provides a [dedicated module to work with it](https://docs.nestjs.com/recipes/swagger).

The configuration for Swagger can be found at this [location](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/tree/master/src/swagger).

---

### ✨ TypeORM

TypeORM is an object-relational mapping that acts as an abstraction layer over operations on databases. Please view the [documentation](https://typeorm.io/#/) for further details.

The configuration for TypeORM can be found in the [app module](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/blob/master/src/modules/app/app.module.ts#L17).

---

### 🔊 Logs

This boilerplate comes with a Winston module for logging, the configurations for Winston can be found in the [app module](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/blob/master/src/modules/main/app.module.ts#L24).

---

### 👥 Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

---

## License

Nest is [MIT licensed](LICENSE).

[Author](https://msanvarov.github.io/personal-portfolio/)
