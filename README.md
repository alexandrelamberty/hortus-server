# Hortus Server

[Hortus Server](https://github.com/alexandrelamberty/hortus-server) the server-side components for the [Hortus Web](https://github.com/alexandrelamberty/hortus-web) and [Hortus Mobile](https://github.com/alexandrelamberty/hortus-mobile).

The server expose an API written in Typescript using NestJS and a MySQL database.

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
- Twitter - [@eevos](https://twitter.com/eevos)

## License

Garden Planner is [MIT licensed](LICENSE).

## Ressources

https://dev.to/carlomigueldy/building-a-restful-api-with-nestjs-and-mongodb-mongoose-2165
https://francescociulla.com/crud-api-using-nestjs-mongoose-mongodb-and-docker
https://stackoverflow.com/questions/52230301/mongoose-with-nestjs-one-to-many
https://bezkoder.com/mongoose-one-to-many-relationship/
https://bezkoder.com/mongoose-one-to-one-relationship-example/
https://medium.com/weekly-webtips/building-modern-backendusing-nest-js-and-mongodb-96fd04f4b050


