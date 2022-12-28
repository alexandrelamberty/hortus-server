// import { VersioningType } from '@nestjs/common';
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { join } from "path";

import { AppModule } from "@app/app.module";

import { BadRequestExceptionFilter } from "@common/exceptions/bad-request.exception.filter";
import { ExceptionsLoggerFilter } from "@common/exceptions/exceptionLogger.filter";
import { HttpExceptionFilter } from "@common/exceptions/http-exception.filter";
import { MongoExceptionFilter } from "@common/exceptions/mongo-exception.filters";
import { logger } from "@common/middleware/logger.middleware";

async function bootstrap() {
  // Check types or interfaces; NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Logger
  app.use(logger);

  // Exception Filters - https://docs.nestjs.com/exception-filters
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ExceptionsLoggerFilter(httpAdapter),
    new BadRequestExceptionFilter(),
    new MongoExceptionFilter()
  );

  // Interceptors -
  //app.useGlobalInterceptors(new TransformInterceptor())

  // Pipes - https://docs.nestjs.com/pipes
  app.useGlobalPipes(new ValidationPipe());

  // Versioning - https://docs.nestjs.com/techniques/versioning#versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Cookies - https://docs.nestjs.com/techniques/cookies
  app.use(cookieParser());

  // Cors - https://docs.nestjs.com/security/cors#cors
  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
  });

  // Static assets
  app.useStaticAssets(join(__dirname, "..", "upload"), {
    prefix: "/static/",
  });

  await app.listen(3333);
}
bootstrap();
