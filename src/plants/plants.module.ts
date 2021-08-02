import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { Plant, PlantSchema } from './schemas/plant.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [PlantsService],
  controllers: [PlantsController],
})
export class PlantsModule {}
