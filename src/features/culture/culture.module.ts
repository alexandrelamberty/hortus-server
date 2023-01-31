import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CultureController } from "./controllers/culture.controller";
import { CultureService } from "./providers/culture.service";
import { Culture, CultureSchema } from "./schemas/culture.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Culture.name, schema: CultureSchema }]),
  ],
  providers: [CultureService],
  controllers: [CultureController],
})
export class CultureModule {}
