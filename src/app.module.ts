import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CropsModule } from './crops/crops.module';
import { ImagesModule } from './images/images.module';
import { PlantFamilyModule } from './plants-families/plant-family.module';
import { PlantGenusModule } from './plants-genuses/plant-genus.module';
import { PlantTypeModule } from './plants-types/plant-type.module';
import { PlantsModule } from './plants/plants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.dev.env' }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    /*
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
  }),
  */
    AuthModule,
    UsersModule,
    ImagesModule,
    PlantsModule,
    CropsModule,
    PlantFamilyModule,
    PlantGenusModule,
    PlantTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
