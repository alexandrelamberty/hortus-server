# Garden Planner Server

## Description

[Garden Planner Server](https://github.com/alexandrelamberty/garden-planner-backend) the server-side components for the [Garden Planner Web] and [Garden Planner Mobile].

The server expose an API written in Javascript using NestJS and communicate with a Docker MongoDB container.

## Installation

Create the database container. see `docker-compose.yml`
```bash
$ docker-compose build
```

Install the javascript dependencies. see `package.json`
```bash
$ npm install
```

## Running the app

Start the database container named "garden-planner-mongodb". see `docker-compose.yml`
```bash
$ docker 
```

Run the application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Garden Planner is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://github.com/alexandrelamberty/garden-planner-backend/blob/master/SUPPORT.md).

## Stay in touch

- Author - [Alexandre Lamberty](mailto:mail@alexandrelamberty.com?subject=[GitHub]%20Garden%20Planner%20Backend)
- Website - [https://alexandrelamberty.com](https://alexandrelamberty.com/)
- Twitter - [@alexandrelamberty](https://twitter.com/alexandrelamberty)

## License

Garden Planner is [MIT licensed](LICENSE).
