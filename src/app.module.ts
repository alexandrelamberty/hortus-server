import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CropModule } from './crops/crops.module';
import { Crop } from './crops/crops.entity';

@Module({
 	imports: [
    CropModule,
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
