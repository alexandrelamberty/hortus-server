// import { VersioningType } from '@nestjs/common';
import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {

  const logger = new Logger("Main");

  // Check types or interfaces; NestExpressApplication
  const app = await NestFactory.create<INestApplication>(AppModule, {});
  app.useGlobalPipes(new ValidationPipe());

  // Versioning - https://docs.nestjs.com/techniques/versioning#versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

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

  //const configService = app.get('ConfigService');
  // configService.get('port')
  
  try {
    await app.listen(3333);
  } catch (e) {
    logger.error(e);
  } finally {
    // TODO:   
    logger.log(`Hortus is running: ${await app.getUrl()}`);
  }
}
bootstrap();
