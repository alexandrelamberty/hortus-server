[![Build & Tests](https://github.com/alexandrelamberty/hortus-api/actions/workflows/node.yml/badge.svg)](https://github.com/alexandrelamberty/hortus-api/actions/workflows/node.yml)
[![Docker](https://github.com/alexandrelamberty/hortus-api/actions/workflows/docker.yml/badge.svg)](https://github.com/alexandrelamberty/hortus-api/actions/workflows/docker.yml)

# Hortus API

Gardening planner API part of the
[Hortus](https://github.com/alexandrelamberty/hortus) project.

This application expose an API with NestJS that connect to a MongoDB and Redis databases. It use authentication/encryption with JWT and BCRYPT.

The API implement the [Hortus API Specification](https://github.com/alexandrelamberty/hortus-api-spec)

## Technologies, languages, frameworks

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

## Requirements

- [Docker](https://www.docker.com/)
- [NPM](https://www.npmjs.com/) for development

## Usage

This application is part of a Docker stack. see:
[Hortus](https://github.com/alexandrelamberty/hortus) project to run the
complete stack.

## Development

This API run as a Docker service and rely on a [MongoDB](https://hub.docker.com/_/mongo) database and a [Redis](https://hub.docker.com/_/redis) cache service.

### Run required services

See [Hortus]()

### Environment variables

Create a file named `.env` and insert the following properties

```properties
ENV=dev
PORT=3333
PAIRING_KEY=9fca54477c8ad4e70dc5e1084f884aad
JWT_SECRET=d7a481461577ba4c3c4c6946cca7204b
JWT_EXPIRE=90
BCRYPT_HASH=7f91317e30a02bc7b87205e95b842df2
DATABASE_URI=mongodb://hortus:hortus@localhost:27017/hortus
STATIC_DIR=/upload
UPLOAD_PATH=/upload
CACHE_HOST=localhost
CACHE_PORT=6379
CACHE_TTL=300
SESSION_HOST=localhost
SESSION_PORT=6380
SESSION_TTL=300
```

This config will work out of the box in most case. Verify that the ports
specified in the configuration are not in use.

### Running with NPM

Run the application

```bash
npm run start:development
```

### Tests

> To implement

```bash
npm run tests
```

## Build and run with Docker

Build the image, see: [Dockerfile](./Dockerfile).

```bash
docker build . -t alexandrelamberty/hortus-api:{tag}
```

Run the image, specify the ports mapping, environment variables file and network to join.

FIXME: link source folder

```bash
docker run -p 3333:3333 --network=hortus_default --env-file .env --name hortus-api -d alexandrelamberty/hortus-api:{tag}
```
