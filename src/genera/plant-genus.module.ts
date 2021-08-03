import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantGenusController } from './plant-genus.controller';
import { PlantGenusService } from './plant-genus.service';
import { PlantGenus, PlantGenusSchema } from './schema/plant-genus.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlantGenus.name, schema: PlantGenusSchema },
    ]),
  ],
  providers: [PlantGenusService],
  controllers: [PlantGenusController],
})
export class PlantGenusModule {}
