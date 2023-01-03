// import { VersioningType } from '@nestjs/common';
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { join } from "path";
import { AppModule } from "./app/app.module";
import { MongoCastFilter } from "./common/exceptions/mongo-cast.filters";
import { MongoErrorFilter } from "./common/exceptions/mongo-error.filters";
import { MongoNativeErrorFilter } from "./common/exceptions/mongo-native-error.filter";
import { MongoValidationFilter } from "./common/exceptions/mongo-validation.filters";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Cookies - https://docs.nestjs.com/techniques/cookies
  app.use(cookieParser());

  // Cors - https://docs.nestjs.com/security/cors#cors
  app.enableCors({
    origin: "http://localhost:3000",
    allowedHeaders:
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe",
    exposedHeaders: "Pagination-Count, Pagination-Page, Pagination-Limit",
  });

  // Exception Filters - https://docs.nestjs.com/exception-filters
  // const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    // FIXME:
    // new HttpExceptionFilter(),
    new MongoCastFilter(),
    new MongoValidationFilter(),
    new MongoErrorFilter(),
    new MongoNativeErrorFilter()
  );

  // Pipes - https://docs.nestjs.com/pipes
  app.useGlobalPipes(new ValidationPipe());

  // Interceptors -
  //app.useGlobalInterceptors(new TransformInterceptor())

  // Logger
  // app.use(logger);

  // Static assets
  app.useStaticAssets(join(__dirname, "..", "upload"), {
    prefix: "/static/",
  });

  // Versioning - https://docs.nestjs.com/techniques/versioning#versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(3333);
}
bootstrap();
