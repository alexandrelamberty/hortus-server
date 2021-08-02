import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantTypeController } from './plant-type.controller';
import { PlantTypeService } from './plant-type.service';
import { PlantType, PlantTypeSchema } from './schema/plant-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlantType.name, schema: PlantTypeSchema },
    ]),
  ],
  providers: [PlantTypeService],
  controllers: [PlantTypeController],
})
export class PlantTypeModule {}
