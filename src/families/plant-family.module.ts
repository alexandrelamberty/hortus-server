import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantFamilyService } from './plant-family.service';
import { PlantFamilyController } from './plant-family.controller';
import { PlantFamily, PlantFamilySchema } from './schema/plant-family.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlantFamily.name, schema: PlantFamilySchema },
    ]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [PlantFamilyService],
  controllers: [PlantFamilyController],
})
export class PlantFamilyModule {}
