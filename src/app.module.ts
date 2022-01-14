import {
  CacheModule,
  CACHE_MANAGER,
  Inject,
  Module
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as redisStore from 'cache-manager-redis-store';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import configuration from './config/configuration';
import { DatabaseConfigService } from './config/providers/DatabaseConfigService';
import { validate } from './config/validators/env.validation';
import { SeedModule } from './seeds/seed.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './tasks/task.module';
import { CultureModule } from './culture/culture.module';
@Module({
  imports: [
    // Configuration - https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      envFilePath: '.env',
      ignoreEnvFile: false,
      isGlobal: true,
      cache: false,
      load: [configuration],
      // validate,
    }),
    // Database - https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRootAsync({
      imports: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongo.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService], // Inject DatabaseConfigService
    }),
    // Cache - https://docs.nestjs.com/techniques/caching
    CacheModule.registerAsync({
      imports: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get('cache.host'),
        port: configService.get('cache.port'),
        ttl: parseInt(configService.get('cache.ttl')),
      }),
      inject: [ConfigService], // Inject DatabaseConfigService
    }),
    // Session TODO: server the client with express to benefit from express or check nestjs
    // Static Server - https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    /*
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/upload'),
    }),
    */
    // Task Scheduling - https://docs.nestjs.com/techniques/task-scheduling
    ScheduleModule.forRoot(),
    // File upload
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('medias.upload'),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),
    // Modules
    AuthModule,
    UsersModule,
    SeedModule,
    CultureModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseConfigService,
    /*
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    */
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [DatabaseConfigService, CacheModule],
})
export class AppModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager) {
    const client = cacheManager.store.getClient();
    client.on('error', (error) => {
      console.error(error);
    });
  }
}
