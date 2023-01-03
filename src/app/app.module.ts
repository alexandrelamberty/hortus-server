import {
  DynamicModule,
  Logger,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { LoggingInterceptor } from "../common/interceptors/logging.interceptor";
import { logger } from "../common/middleware/logger.middleware";
import configuration from "../config/configuration";
import { DatabaseConfigService } from "../config/providers/DatabaseConfigService";
import { validate } from "../config/validators/env.validation";
import { CultureModule } from "../culture/culture.module";
import { PlantModule } from "../plant/plant.module";
import { SeedsModule } from "../seeds/seeds.module";
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
      imports: [ConfigService],
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
    PlantModule,
    SeedsModule,
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
    Logger.log(options);
    // FIXME: inject fake but correct environment variable
    // For testing with GitHub
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
