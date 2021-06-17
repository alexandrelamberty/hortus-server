import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CropsModule } from './crops/crops.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/gardening-planner', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CropsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
