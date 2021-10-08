# Hortus Server

[Hortus Server](https://github.com/alexandrelamberty/hortus-server) the server-side components for the [Hortus Web](https://github.com/alexandrelamberty/hortus-web) and [Hortus Mobile](https://github.com/alexandrelamberty/hortus-mobile).

The server is composed of four differents parts, an API running on Node, a Mongo database, a Redis instance to cache requests and a Redis instance to store the users sessions.

The API is securised with password-based authentication and token-based authentication.

## Requirements

- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)

## Installation

After you have cloned the repository, install the javascript dependencies with npm, see [`package.json`](package.json)

```bash
$ npm install
```

## Configuration

The configuration is stored as environment variables in an `.env` file.

Rename the [`.env.sample`](.env.sample) to [`.env`](.env) and fill it accordingly.

## Build

```bash
$ docker-compose --env-file .dev.env build
```

## Deployement

Run the application

```bash
$ docker-compose --env-file .dev.env up
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

Hortus is [MIT licensed](LI<CENSE).

## References

- [UPOV - GENIE](https://www.upov.int/genie/index.xhtml)
- [Taxacom - Biological Systematics Discussion List](http://mailman.nhm.ku.edu/cgi-bin/mailman/listinfo/taxacom)
- [International Name Index](https://www.ipni.org/)
- [The Plant List](http://www.theplantlist.org/)
- [World Flora Online](http://www.worldfloraonline.org/)
- [Latin Linguistics - A Useful Tool in Horticulture](https://hortnews.extension.iastate.edu/1999/7-23-1999/latin.html)
<<<<<<< HEAD

=======
>>>>>>> 0f868b6cf23cadfb9d6fefa02a173f77c29c6f25
