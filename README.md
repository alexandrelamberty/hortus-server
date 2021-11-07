[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) ![example workflow](https://github.com/alexandrelamberty/hortus-server/actions/workflows/node.js.yml/badge.svg)

# Hortus Server

Backend application that expose a secured api and a websocket for real-time communicate with [Hortus Web Client](https://github.com/alexandrelamberty/hortus-web-client) and [Hortus Mobile](https://github.com/alexandrelamberty/hortus-mobile). The application collect data from [Hortus Wireless Temperature Sensor]().

## Technologies

- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Node.js](https://www.docker.com/)
- [NestJS](https://www.docker.com/)
- [Socket.io](https://www.docker.com/)
- [MongoDB](https://www.docker.com/)
- [Redis](https://www.docker.com/)

## Requirements

- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

## Installation

After you have cloned the repository, install the javascript dependencies with npm, see [`package.json`](package.json)

```bash
npm install
```

## Configuration

Create a file named `.dev.env` and insert the following

```properties
NODE_ENV=development
API_URL=localhost
API_PORT=3333
DATABASE_ROOT_USER=root
DATABASE_ROOT_PASSWORD=root
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_NAME=hortus
DATABASE_USERNAME=hortus
DATABASE_PASSWORD=hortus
DATABASE_URI=mongodb://hortus:hortus@localhost:27017/hortus
CACHE_HOST=localhost
CACHE_PORT=6379
CACHE_TTL=300
SESSION_HOST=localhost
SESSION_PORT=6380
SESSION_TTL=300
STATIC_DIR=/upload
JWT_SECRET=123456
JWT_EXPIRE=123456
BCRYPT_HASH=12345
UPLOAD_PATH=/upload
```

This config will work out of the box in most case. Verify that the ports specified in the configuration are not in use.

## Build

Build all the services.

```bash
docker-compose --env-file .dev.env build
```

## Deployement

Run the application

```bash
docker-compose --env-file .dev.env up
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
