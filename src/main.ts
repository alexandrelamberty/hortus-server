// import { VersioningType } from '@nestjs/common';
import {
  INestApplication,

  ValidationPipe,
  VersioningType
} from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { BadRequestExceptionFilter } from 'src/common/exceptions/bad-request.exception.filter'
import { ExceptionsLoggerFilter } from 'src/common/exceptions/exceptionLogger.filter'
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter'
import { MongoExceptionFilter } from 'src/common/exceptions/mongo-exception.filters'
import { logger } from 'src/common/middleware/logger.middleware'
import { AppModule } from './app/app.module'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'


async function bootstrap() {

  // Check types or interfaces; NestExpressApplication
  const app = await NestFactory.create<INestApplication>(AppModule)
  
  // Logger - 
  app.use(logger);

  // Exception Filters - https://docs.nestjs.com/exception-filters
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ExceptionsLoggerFilter(httpAdapter),
    new BadRequestExceptionFilter(),
    new MongoExceptionFilter()
  )
  
  // Interceptors - 
  //app.useGlobalInterceptors(new TransformInterceptor())

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

  await app.listen(3333)
}
bootstrap()
