// import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  /*
  // Versioning - https://docs.nestjs.com/techniques/versioning#versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  */

  // Cookies - https://docs.nestjs.com/techniques/cookies
  app.use(cookieParser());

  // Cors - https://docs.nestjs.com/security/cors#cors
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  // Swagger - https://docs.nestjs.com/openapi/introduction
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hortus API')
    .setDescription('The Hortus API let you manage plants and cultures.')
    .setVersion('1.0')
    .addTag('hortus')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const config = app.get('ConfigService');

  try {
    await app.listen(config.get('port'));
  } catch (e) {
    console.error(e);
  } finally {
    console.log(`Hortus is running: ${await app.getUrl()}`);
  }
}
bootstrap();
