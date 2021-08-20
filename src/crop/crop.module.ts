import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { CropController } from './controllers/crop.controller';
import { TypeController } from './controllers/type.controller';
import { CropService } from './providers/crop.service';
import { TypeService } from './providers/type.service';
import { Crop, CropSchema } from './schemas/crop.schema';
import { Type, TypeSchema } from './schemas/type.schema';

@Module({
  imports: [
    CacheModule.register(),
    MongooseModule.forFeature([
      { name: Crop.name, schema: CropSchema },
      { name: Type.name, schema: TypeSchema },
    ]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [
    CropService,
    TypeService,
  ],
  controllers: [
    CropController,
    TypeController,
  ],
})
export class CropModule { }
