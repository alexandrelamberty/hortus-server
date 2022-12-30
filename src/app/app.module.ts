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
import { LoggingInterceptor } from "../common/interceptors/logging.interceptor";
import { logger } from "../common/middleware/logger.middleware";
import configuration from "../config/configuration";
import { DatabaseConfigService } from "../config/providers/DatabaseConfigService";
import { validate } from "../config/validators/env.validation";
import { CultureModule } from "../culture/culture.module";
import { PlantModule } from "../plant/plant.module";
import { SeedModule } from "../seeds/seed.module";
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
    console.log(options);
    // Set environment variabls here
    process.env["NODE_ENV"] = "development";
    process.env.PORT = "3333";
    process.env["PAIRING_KEY"] = "9fca54477c8ad4e70dc5e1084f884aad";
    process.env["JWT_SECRET"] = "d7a481461577ba4c3c4c6946cca7204b";
    process.env["JWT_EXPIRE"] = "90";
    process.env["BCRYPT_HASH"] = "7f91317e30a02bc7b87205e95b842df2";
    process.env.DATABASE_URI = "mongodb://hortus:hortus@localhost:27017/hortus";
    process.env["STATIC_DIR"] = "/upload";
    process.env["UPLOAD_PATH"] = "/upload";
    process.env["CACHE_HOST"] = "localhost";
    process.env["CACHE_PORT"] = "6379";
    process.env["CACHE_TTL"] = "300";
    process.env["SESSION_HOST"] = "localhost";
    process.env["SESSION_PORT"] = "6380";
    process.env["SESSION_TTL"] = "300";

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
