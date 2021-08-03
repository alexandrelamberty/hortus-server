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
import configuration from './config/configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      ignoreEnvFile: false,
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION, {
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
