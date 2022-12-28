import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { SeedSchemaFactory } from "@seeds/schemas/seed.schema";
import { CultureController } from "./controllers/culture.controller";
import { CultureService } from "./providers/culture.service";
import { Culture } from "./schemas/culture.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Culture.name,
        useFactory: SeedSchemaFactory,
      },
    ]),
  ],
  providers: [CultureService],
  controllers: [CultureController],
})
export class CultureModule {}
