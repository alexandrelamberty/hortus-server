import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { PlantController } from "./controllers/plant.controller";
import { PlantService } from "./providers/plant.service";
import { Plant, PlantSchema } from "./schemas/plant.schema";

@Module({
  imports: [
    // CacheModule.register(),
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),

    MulterModule.register({
      // FIXME: config/env
      // dest: "./upload",
      // Use memory to use within the SharpPipe
      storage: memoryStorage(),
    }),
  ],
  providers: [PlantService],
  controllers: [PlantController],
})
export class PlantModule {}
