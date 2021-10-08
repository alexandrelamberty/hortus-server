import { Module } from '@nestjs/common';
import { LocalisationController } from './localisation.controller';
import { LocalisationService } from './localisation.service';

@Module({
  controllers: [LocalisationController],
  providers: [LocalisationService]
})
export class LocalisationModule {}
