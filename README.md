[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) ![example workflow](https://github.com/alexandrelamberty/hortus-server/actions/workflows/node.js.yml/badge.svg)

# Hortus API

Gardening planner API part of the
[Hortus](https://github.com/alexandrelamberty/hortus) project.

This application expose an API with NestJS that connect to a MongoDB and Redis databases.
use encryption with JWT and BCRYPT.

The API implement the [Hortus API Specification](https://github.com/alexandrelamberty/hortus-api-spec)

## Architecture

This API run as a Docker service and rely on a [MongoDB](https://hub.docker.com/_/mongo) database and a [Redis](https://hub.docker.com/_/redis) cache service.

## Technologies, languages, frameworks...

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)Z
- [Socket.io](https://socket.io/)

## Requirements

- [Docker](https://www.docker.com/)
- [NPM](https://www.npmjs.com/) for development

## Usage

This application is part of a Docker stack. see:
[Hortus](https://github.com/alexandrelamberty/hortus) project to run the
complete stack.

## Development

Create a file named `.env` and insert the following

```properties
NODE_ENV=dev
# Database (MongoDB)
DATABASE_URI=mongodb://hortus:hortus@hortus-database:27017/hortus
# Cache (Redis)
CACHE_HOST=hortus-cache
CACHE_PORT=6379
CACHE_TTL=300
# Session (Redis)
SESSION_HOST=hortus-session
SESSION_PORT=6380
SESSION_TTL=300
# Authentication
JWT_SECRET=123456
JWT_EXPIRE=123456
BCRYPT_HASH=12345
```

This config will work out of the box in most case. Verify that the ports
specified in the configuration are not in use.

## Running with NPM

```bash
npm run start:development
```

## Running with Docker

```bash
docker run -p 3333:3333 --network=hortus_default --env-file .env --name hortus-api -d alexandrelamberty/hortus-api:latest
```

## Tests

```bash
npm run tests
```

## Build 

```bash
docker build . -t alexandrelamberty/hortus-api:latest
```

## Push to Docker Hub

> Automated with GitHub Action, see: [docker.yml](./.github/workflows/docker.yml)

```bash
docker tag alexandrelamberty/hortus-api:latest alexandrelamberty/hortus-api:latest
docker push alexandrelamberty/hortus-api:latest
```## Publish
