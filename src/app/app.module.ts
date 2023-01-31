import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { AuthModule } from "../features/auth/auth.module";
import configuration from "../shared/config/configuration";
import { DatabaseConfigService } from "../shared/config/providers/DatabaseConfigService";
import { validate } from "../shared/config/validators/env.validation";
import { LoggingInterceptor } from "../core/interceptors/logging.interceptor";
import { logger } from "../core/middleware/logger.middleware";
import { CultureModule } from "../features/culture/culture.module";
import { SeedModule } from "../features/seeds/seed.module";
import { PlantModule } from "../features/plant/plant.module";
import { UsersModule } from "../features/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    // Configuration - https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      /*       envFilePath: '.env',
            ignoreEnvFile: false, */
      isGlobal: true,
      cache: false,
      load: [configuration],
      validate,
    }),

    // Database - https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get("mongo.uri"),
        useNewUrlParser: true,
        // https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService], // Inject DatabaseConfigService
    }),

    // Cache - https://docs.nestjs.com/techniques/caching
    /*     CacheModule.registerAsync({
          imports: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            isGlobal: true,
            store: redisStore,
            host: configService.get('cache.host'),
            port: configService.get('cache.port'),
            ttl: parseInt(configService.get('cache.ttl')),
          }),
          inject: [ConfigService], // Inject DatabaseConfigService
        }), */

    // Task Scheduling - https://docs.nestjs.com/techniques/task-scheduling
    // ScheduleModule.forRoot(),

    // File upload
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get("medias.upload"),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),

    // Features modules
    AuthModule,
    UsersModule,
    PlantModule,
    SeedModule,
    CultureModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseConfigService,
    // {
    // provide: APP_INTERCEPTOR,
    // useClass: CacheInterceptor,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: MongoExceptionFilter,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [DatabaseConfigService /*, CacheModule */],
})
export class AppModule {
  static register(options: any): DynamicModule {
    return {
      module: AppModule,
    };
  }
  /*
    constructor(@Inject(CACHE_MANAGER) cacheManager) {
      const client = cacheManager.store.getClient()
      client.on('error', (error) => {
        console.error('CacheManager', error)
      })
    */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes({ path: "ab*cd", method: RequestMethod.ALL });
  }
}
