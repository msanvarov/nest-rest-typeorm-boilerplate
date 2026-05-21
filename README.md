<h1 align="center">API Starter</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, paired with an Angular workspace and a Model Context Protocol (MCP) module for AI workflows.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://github.com/msanvarov/nest-rest-typeorm-boilerplate/actions"><img src="https://github.com/msanvarov/nest-rest-typeorm-boilerplate/actions/workflows/lint-and-test-merge.yml/badge.svg" alt="Github Actions" /></a>
</p>

## Table of Contents

1. [Description](#description)
2. [Stack](#stack)
3. [Prerequisites](#prerequisites)
4. [Deployment](#deployment)
5. [Environment Configuration](#environment-configuration)
6. [MCP Module](#mcp-module)
7. [Web Framework](#web-framework)
8. [HTTP/2](#http2)
9. [Database](#database)
10. [Testing](#testing)
11. [TypeDocs](#typedocs)
12. [Open API](#open-api)
13. [TypeORM](#typeorm)
14. [Logs](#logs)
15. [Progress](#progress)
16. [Contribution](#contribution)

This repo was created with [Nx](https://nx.dev/).

## Description

This boilerplate is made to quickly prototype backend applications. It comes with authentication, authorization, logging, CRUD features, database persistence, and a built-in Model Context Protocol (MCP) server + client out of the box. An Angular workspace ships alongside for a thin admin UI with an MCP chat preview.

## Stack

| Layer        | Tech                                                                 |
| ------------ | -------------------------------------------------------------------- |
| Runtime      | Node.js 20+                                                          |
| Monorepo     | Nx 21                                                                |
| API          | NestJS 11 (Fastify adapter), TypeORM 0.3, Passport JWT, Swagger      |
| AI / MCP     | `@modelcontextprotocol/sdk` 1.x (server + client over Streamable HTTP) |
| Database     | MySQL / MariaDB (TypeORM supports Postgres, SQLite, MSSQL, MongoDB)  |
| UI           | Angular 19, Angular Material 19 (Material 3 theme), standalone components |
| Tooling      | TypeScript 5.6, ESLint 9, Prettier 3, Jest 29, Cypress 13            |

## Prerequisites

### Non-Docker

- Node.js 20+ (`brew`, `choco`, `apt-get`, or via [nodejs.org](https://nodejs.org/en/download/)).
- MySQL/MariaDB available locally (XAMPP, Homebrew, Docker, etc.).

### Docker

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

## Deployment

### Manual Deployment without Docker

- Clone the repo: `git clone https://github.com/msanvarov/nest-rest-typeorm-boilerplate`.
- Install dependencies: `npm install`.
- Copy the env template: `cp .env.example .env` and fill in valid values.
- Start the API: `npm run start` (served on http://localhost:3333).

<details open>
<summary>Optional deployment of the UI</summary>
<br>

- The Angular UI is at `apps/ui` and ships with an MCP chat preview at `/mcp`.
- Start it in a separate terminal: `npm run start:ui` (served on http://localhost:4200).

> In the docker deployment, the UI is automatically built and served by the API.

</details>

### Deploying with Docker

```bash
docker-compose up -d
```

The compose stack brings up the API behind an Nginx reverse proxy on http://localhost:80.

## Environment Configuration

The API reads every env var from `.env`.

- **APP_ENV** — `development` or `production`. Drives logging and `synchronize` behavior in TypeORM.
- **PORT** — HTTP port; defaults to 3333.
- **WEBTOKEN_ENCRYPTION_KEY** — random secret used to sign JWTs.
- **WEBTOKEN_EXPIRATION_TIME** — seconds before a JWT expires (default 2400).
- **DB_TYPE** — TypeORM connection type (`mysql`, `mariadb`, `postgres`, etc.).
- **DB_USERNAME / DB_PASSWORD / DB_HOST / DB_PORT / DB_DATABASE** — standard database credentials.
- **MCP_SERVER_NAME / MCP_SERVER_VERSION** — identity reported by the local MCP server.
- **MCP_CLIENT_REMOTES** — comma-separated list of external MCP server endpoints to connect to as a client (Streamable HTTP URLs).

## MCP Module

This project ships with a first-class Model Context Protocol integration so the API can both **expose** itself to AI clients and **consume** other MCP servers.

### What's included

| Piece                              | Path                                       | Role                                                              |
| ---------------------------------- | ------------------------------------------ | ----------------------------------------------------------------- |
| `McpServerService`                 | `apps/api/src/mcp/mcp-server.service.ts`   | In-process MCP server. Registers `list-users`, `get-user` tools and `mcp://nest/schema/users`, `mcp://nest/server-info` resources. |
| `McpClientService`                 | `apps/api/src/mcp/mcp-client.service.ts`   | Connects to every endpoint in `MCP_CLIENT_REMOTES` on startup and mirrors their tools/resources/prompts. |
| `McpGatewayService`                | `apps/api/src/mcp/mcp-gateway.service.ts`  | Aggregates local + remote inventory, routes tool calls, and runs the deterministic chat preview. |
| `McpController`                    | `apps/api/src/mcp/mcp.controller.ts`       | REST surface for the UI plus the native MCP Streamable HTTP transport. |
| `@starter/mcp-types`               | `libs/mcp-types`                           | TypeScript types shared with the Angular client.                  |
| `@starter/mcp-chat`                | `libs/mcp-chat`                            | Standalone Angular component, lazy-loaded under `/mcp` in the UI. |

### Endpoints

| Method | Path                          | Purpose                                                                 |
| ------ | ----------------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/v1/mcp/inventory`       | Returns servers + tools + resources + prompts as JSON.                  |
| POST   | `/api/v1/mcp/invoke`          | Body: `{ serverId, name, arguments }` — invokes a tool.                 |
| GET    | `/api/v1/mcp/resource`        | Query: `serverId`, `uri` — reads a resource.                            |
| POST   | `/api/v1/mcp/chat`            | Body: `{ message, toolCall?, history? }` — chat preview entry point.    |
| ANY    | `/api/v1/mcp/transport`       | Native MCP Streamable HTTP endpoint for AI clients (Claude Desktop, Claude Code, mcp-cli, etc.). |

### Connecting an external MCP client

Point a Streamable-HTTP-aware MCP client at `http://localhost:3333/api/v1/mcp/transport`. The server advertises `MCP_SERVER_NAME@MCP_SERVER_VERSION` and exposes the registered tools and resources.

### Consuming external MCP servers

Set `MCP_CLIENT_REMOTES` to a comma-separated list of Streamable HTTP URLs. On startup, the API connects to each, mirrors their inventory into `/api/v1/mcp/inventory`, and routes invocations through the same chat endpoint.

### Chat preview

Visit `http://localhost:4200/mcp` in the UI. The preview lists every connected server, surfaces tools as chips, and lets you trigger them or chat in natural language. Built-in heuristics route phrases like "list users" or "get user alice" to the right tool — wire in your own LLM if you want full reasoning.

## Web Framework

The API uses [Fastify](https://github.com/fastify/fastify) via `@nestjs/platform-fastify` for its performance characteristics. An Express variant lives on a [separate branch](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/tree/express).

## HTTP/2

Fastify supports HTTP/2 over HTTPS (h2) or plaintext (h2c). A working example with a self-signed certificate is on the [feat/http2 branch](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/tree/feat/http2).

Generate a self-signed cert with OpenSSL:

```bash
openssl req -x509 -newkey rsa:4096 -keyout api-key.pem -out api-cert.pem -days 365 -nodes
```

> Express can do HTTP/2 via the [spdy](https://www.npmjs.com/package/spdy) library.

## Database

The boilerplate defaults to **MySQL/MariaDB**. TypeORM supports SQLite, Postgres, MongoDB, and MSSQL — change `DB_TYPE` and install the matching driver (e.g. [pg](https://www.npmjs.com/package/pg) for Postgres).

> For MongoDB, mongoose tends to be a better fit. See the [Nest + Mongoose boilerplate](https://github.com/msanvarov/nest-rest-mongo-boilerplate).

## Testing

### Docker

```bash
docker start nest-rest-typeorm-api
docker exec -it nest-rest-typeorm-api npm run test
```

### Non-Docker

```bash
npm run test
```

## TypeDocs

The documentation site is published on [GitHub Pages](https://msanvarov.github.io/nest-rest-typeorm-boilerplate/).

Generate locally with `npm run typedocs:api:start` (API) or `npm run typedocs:ui:start` (UI).

```bash
npm run typedocs:api:start
```

## Open API

Swagger UI is served at `/api/v1/docs`. Configuration lives in `apps/api/src/main.ts`.

## TypeORM

TypeORM is the persistence layer. See the [official docs](https://typeorm.io/) for advanced usage.

Connection config lives in `apps/api/src/app.module.ts`.

## Logs

Winston is wired up via `nest-winston`. In development the API logs to the console with timestamps; in production it adds a JSON error file at `logs/error.log` and a daily-rotated archive under `logs/application-YYYY-MM-DD.log`.

## Progress

|                                                                       Branches | Status |
| -----------------------------------------------------------------------------: | :----- |
|             [main](https://github.com/msanvarov/nest-rest-typeorm-boilerplate) | stable |
| [feat/\*](https://github.com/msanvarov/nest-rest-typeorm-boilerplate/branches) | wip    |

## Contribution

PRs are appreciated.

## License

Nest is [MIT licensed](LICENSE).

[Author](https://sal-anvarov.com/)
