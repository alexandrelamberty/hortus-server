import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

import { SeedsController } from "./controllers/seeds.controller";
import { SeedsService } from "./seeds.service";
import { Seed, SeedSchema } from "./schemas/seed.schema";

@Module({
  imports: [
    // CacheModule.register(),
    MongooseModule.forFeature([
      {
        name: Seed.name,
        schema: SeedSchema,
      },
    ]),

    MulterModule.register({
      // Use memory to use with the common/pipes/SharpPipe
      storage: memoryStorage(),
    }),
  ],
  providers: [SeedsService],
  controllers: [SeedsController],
})
export class SeedsModule {}
