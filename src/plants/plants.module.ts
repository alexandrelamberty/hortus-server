import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppModule } from 'src/app.module';
import { PlantFamilyController } from './controllers/plant-family.controller';
import { PlantGenusController } from './controllers/plant-genus.controller';
import { PlantTypeController } from './controllers/plant-type.controller';
import { PlantsController } from './controllers/plants.controller';
import { PlantFamilyService } from './providers/plant-family.service';
import { PlantGenusService } from './providers/plant-genus.service';
import { PlantTypeService } from './providers/plant-type.service';
import { PlantsService } from './providers/plants.service';
import { PlantFamily, PlantFamilySchema } from './schemas/plant-family.schema';
import { PlantGenus, PlantGenusSchema } from './schemas/plant-genus.schema';
import { PlantType, PlantTypeSchema } from './schemas/plant-type.schema';
import { Plant, PlantSchema } from './schemas/plant.schema';

@Module({
  imports: [
    //CacheModule.register(),
    MongooseModule.forFeature([
      { name: Plant.name, schema: PlantSchema },
      { name: PlantFamily.name, schema: PlantFamilySchema },
      { name: PlantGenus.name, schema: PlantGenusSchema },
      { name: PlantType.name, schema: PlantTypeSchema },
    ]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [
    PlantsService,
    PlantFamilyService,
    PlantGenusService,
    PlantTypeService,
  ],
  controllers: [
    PlantsController,
    PlantFamilyController,
    PlantGenusController,
    PlantTypeController,
  ],
})
export class PlantsModule {}
