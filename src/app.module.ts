import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as redisStore from 'cache-manager-redis-store';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import configuration from './config/configuration';
import { CropsModule } from './crops/crops.module';
import { ImagesModule } from './images/images.module';
import { PlantsModule } from './plants/plants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Configuration - https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      ignoreEnvFile: false,
      isGlobal: true,
      load: [configuration],
    }),

    // Database - https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),

    // Cache - https://docs.nestjs.com/techniques/caching
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: parseInt(process.env.REDIS_TTL),
    }),

    // Session

    // Static Server - https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    // Modules
    CatsModule,
    AuthModule,
    UsersModule,
    ImagesModule,
    PlantsModule,
    CropsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
  ],
  exports: [CacheModule]
})
export class AppModule {}
