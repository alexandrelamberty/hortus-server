import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropService } from './crops.service';
import { CropController } from './crops.controller';
import { Crop } from './crops.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crop])],
  providers: [CropService],
  controllers: [CropController],
})
export class CropModule {}
