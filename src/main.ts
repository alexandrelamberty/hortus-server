import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // TODO Seciruty issues ?
  app.enableCors();
  await app.listen(3333);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
