[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip) ![example workflow](https://github.com/alexandrelamberty/hortus-server/actions/workflows/node.js.yml/badge.svg)

# Hortus Server

Gardening planner, monitoring and automation server application that expose a secured api and a websocket real-time communication with [Hortus Web Application](https://github.com/alexandrelamberty/hortus-web-client) and [Hortus Mobile](https://github.com/alexandrelamberty/hortus-mobile).
The application receive and process data collected from [Hortus Wireless Temperature / Humidity Sensor](https://github.com/alexandrelamberty/hortus-wireless-temperature-sensor/). 

It is part of the [Hortus](https://github.com/alexandrelamberty/hortus) project

## Development roadmap

- [ ] NestJS
	- [ ] Configuration 
		- [x] Global
		- [ ] Module
	- [x] Database 
	- [x] Request cache 
	- [ ] Session cache 
	- [ ] Auth
		- [x] Login
		- [x] Token
		- [ ] Refresh token
- [ ] API
	- [ ] CRUD


## Features roadmap

- [ ] Add monitoring devices, humidity, temperature, ph
- [ ] Add controller devices, ventilation, heating, watering
- [ ] Monitoring alerts vie SMS, email, mobile and web notifications
- [ ] Automation of ventilation, heating and wateriong

## Technologies

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
