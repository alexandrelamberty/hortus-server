// import { VersioningType } from '@nestjs/common';
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app/app.module'
import { BadRequestExceptionFilter } from 'src/common/exceptions/bad-request.exception.filter'
import { ExceptionsLoggerFilter } from 'src/common/exceptions/exceptionLogger.filter'
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter'
import { MongoExceptionFilter } from 'src/common/exceptions/mongo-exception.filters'
import { logger } from 'src/common/middleware/logger.middleware'


async function bootstrap() {

  // Check types or interfaces; NestExpressApplication
  const app = await NestFactory.create<INestApplication>(AppModule)
  app.use(logger);

  // Exception Filters - https://docs.nestjs.com/exception-filters
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ExceptionsLoggerFilter(httpAdapter),
    new BadRequestExceptionFilter(),
    new MongoExceptionFilter()
  )

  // Pipes - https://docs.nestjs.com/pipes
  app.useGlobalPipes(new ValidationPipe())

  // Versioning - https://docs.nestjs.com/techniques/versioning#versioning
  app.enableVersioning({
    type: VersioningType.URI,
  })

  // Cookies - https://docs.nestjs.com/techniques/cookies
  app.use(cookieParser())

  // Cors - https://docs.nestjs.com/security/cors#cors
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  })

  //const configService = app.get('ConfigService');
  // configService.get('port')
  await app.listen(3333)

}
bootstrap()
