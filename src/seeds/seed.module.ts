import { Module } from "@nestjs/common";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

import { Culture } from "@culture/schemas/culture.schema";

import { SeedController } from "./controllers/seed.controller";
import { SeedService } from "./providers/seed.service";
import { Seed, SeedSchemaFactory } from "./schemas/seed.schema";

@Module({
  imports: [
    // CacheModule.register(),
    MongooseModule.forFeatureAsync([
      {
        name: Seed.name,
        useFactory: SeedSchemaFactory,
        inject: [getModelToken(Culture.name)],
      },
      {
        name: Culture.name,
        useFactory: SeedSchemaFactory,
      },
    ]),

    MulterModule.register({
      // Use memory to use with the common/pipes/SharpPipe
      storage: memoryStorage(),
    }),
  ],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
