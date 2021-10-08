import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { SeedController } from './controllers/seed.controller';
import { SpeciesController } from './controllers/sepecies.controller';
import { SeedService } from './providers/seed.service';
import { SpeciesService } from './providers/species.service';
import { Seed, SeedSchema } from './schemas/seed.schema';
import { Species, SpeciesSchema } from './schemas/species.schema';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([
      { name: Seed.name, schema: SeedSchema },
      { name: Species.name, schema: SpeciesSchema },
    ]),

    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [
    SeedService,
    SpeciesService,
  ],
  controllers: [
    SeedController,
    SpeciesController,
  ],
})
export class SeedModule {}
