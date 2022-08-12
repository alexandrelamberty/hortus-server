[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) ![example workflow](https://github.com/alexandrelamberty/hortus-server/actions/workflows/node.js.yml/badge.svg)

# Hortus Server

Gardening planner, monitoring and automation server application that expose a
secured api and a websocket real-time communication with [Hortus Web
Application](https://github.com/alexandrelamberty/hortus-web-client) and
[Hortus Mobile](https://github.com/alexandrelamberty/hortus-mobile).
The application receive and process data collected from [Hortus Wireless
Temperature / Humidity
Sensor](https://github.com/alexandrelamberty/hortus-wireless-temperature-sensor/).

This repository is part of the [Hortus](https://github.com/alexandrelamberty/hortus) project

## Development roadmap

- [ ] Core
  - [ ] Configuration
    - [x] Global
    - [ ] Module
  - [ ] Logging
  - [ ] Validation
    - [ ] Class validator
  - [_] Serialiaztion, UseInterceptors
  - [ ] Exception
  - [x] Database
  - [x] Cache
    - [ ] Secure session and cache
  - [_] File, Add storage provider to 'bucket', Google, Azure, AWS ?...
        BucketStorage, LocalStorage
  - [ ] Session cache
  - [ ] Auth
    - [ ] Registration
    - [ ] Login
    - [ ] Token
    - [ ] Refresh token
    - [ ] Logout (Refresh token, session, cache, cookies ?)
- [ ] Modules
  - [_] Plants
  - [ ] Mail
  - [ ] Task Scheduling
  - [ ] Sensors management

## Features roadmap

- [ ] Add monitoring devices, humidity, temperature, ph
- [ ] Add controller devices, ventilation, heating, watering
- [ ] Monitoring alerts vie SMS, email, mobile and web notifications
- [ ] Automation of ventilation, heating and wateriong

## Technologies and frameworks

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

## Requirements

- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

## Installation

After you have cloned the repository, install the JavaScript dependencies with
NPM, see [`package.json`](package.json)

```bash
npm install
```

## Configuration

Create a file named `.dev.env` and insert the following

```properties
NODE_ENV=development
# API
API_URL=localhost
API_PORT=3333
# Database (MongoDB)
DATABASE_ROOT_USER=root
DATABASE_ROOT_PASSWORD=root
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_NAME=hortus
DATABASE_USERNAME=hortus
DATABASE_PASSWORD=hortus
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
# File upload
STATIC_DIR=/upload
UPLOAD_PATH=/upload
```

This config will work out of the box in most case. Verify that the ports
specified in the configuration are not in use.

## Build

Build all the services.

```bash
docker-compose --env-file .dev.env build
```

## Development

Before running the application all the services it depends on need to be up and
running.

```bash
docker-compose --env-file .env up database cache session
```

## Database (MongoDB)

You can use the service provided in the docker-compose
[MongoExpress](http://localhost:8081) to browse the database.

## Cache (Redis)

[Redis Commander]()

```bash
docker exec -it hortus-cache redis-cli -p 6379
```

```bash
docker exec -it hortus-cache redis-cli -p 6380
```
