import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { NetworkController } from './network.controller';
import { NetworkService } from './network.service';
import { Sensor, SensorSchema } from './schemas/sensor.schema';
import { SensorsController } from './sensors.controller';
import { SensorsService } from './sensors.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sensor.name, schema: SensorSchema }]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [SensorsService,NetworkService],
  controllers: [SensorsController, NetworkController],
  exports: [SensorsService],
})
export class SensorsModule {}
