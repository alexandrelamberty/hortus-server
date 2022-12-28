import { Module } from "@nestjs/common";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

import { Seed, SeedSchemaFactory } from "@seeds/schemas/seed.schema";

import { PlantController } from "./controllers/plant.controller";
import { PlantService } from "./providers/plant.service";
import { Plant, PlantSchemaFactory } from "./schemas/plant.schema";
import { Culture } from "@culture/schemas/culture.schema";

@Module({
  imports: [
    // CacheModule.register(),
    MongooseModule.forFeatureAsync([
      {
        name: Plant.name,
        useFactory: PlantSchemaFactory,
        inject: [getModelToken(Seed.name)],
      },
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
  providers: [PlantService],
  controllers: [PlantController],
})
export class PlantModule {}
