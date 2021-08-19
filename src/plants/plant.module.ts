import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { FamilyController } from './controllers/family.controller';
import { GenusController } from './controllers/genus.controller';
import { PlantController } from './controllers/plant.controller';
import { TypeController } from './controllers/type.controller';
import { VarieteController } from './controllers/variete.controller';
import { FamilyService } from './providers/family.service';
import { GenusService } from './providers/genus.service';
import { PlantService } from './providers/plant.service';
import { TypeService } from './providers/type.service';
import { VarieteService } from './providers/variete.service';
import { Family, FamilySchema } from './schemas/family.schema';
import { Genus, GenusSchema } from './schemas/genus.schema';
import { Plant, PlantSchema } from './schemas/plant.schema';
import { Type, TypeSchema } from './schemas/type.schema';
import { Variete, VarieteSchema } from './schemas/variete.schema';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([
      { name: Plant.name, schema: PlantSchema },
      { name: Family.name, schema: FamilySchema },
      { name: Genus.name, schema: GenusSchema },
      { name: Type.name, schema: TypeSchema },
      { name: Variete.name, schema: VarieteSchema },
    ]),

    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [
    PlantService,
    FamilyService,
    GenusService,
    TypeService,
    VarieteService,
  ],
  controllers: [
    PlantController,
    FamilyController,
    GenusController,
    TypeController,
    VarieteController,
  ],
})
export class PlantModule {}
