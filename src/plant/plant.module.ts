import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { PlantsController } from "./controllers/plants.controller";
import { PlantsService } from "./plants.service";
import { Plant, PlantSchema } from "./schemas/plant.schema";
import { PlantsRepository } from "./plants.repository";

@Module({
  imports: [
    // CacheModule.register(),
    MongooseModule.forFeature([
      {
        name: Plant.name,
        schema: PlantSchema,
      },
    ]),

    MulterModule.register({
      // Use memory to use with the common/pipes/SharpPipe
      storage: memoryStorage(),
    }),
  ],
  providers: [PlantsService, PlantsRepository],
  controllers: [PlantsController],
})
export class PlantModule {}
