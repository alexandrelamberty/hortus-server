import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

import { SeedController } from "./controllers/seed.controller";
import { SeedService } from "./providers/seed.service";
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
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
